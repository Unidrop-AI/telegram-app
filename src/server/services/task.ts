import {
  badRequestException,
  constants as coreConstants,
  type InferAuthApiRequest,
} from '@roxavn/core/base';
import { AuthRequest, BaseService, inject } from '@roxavn/core/server';
import {
  AssignTaskService,
  CreateProjectService,
  CreateTaskService,
  FinishTaskService,
  GetManyTasksService,
  GetProjectsService,
  GetRootTaskService,
  GetTaskService,
} from '@roxavn/module-project/server';
import { CreatePaymentTransactionService } from '@roxavn/plugin-payment/server';
import {
  GetSkillsService,
  UpdateUserSkillService,
} from '@roxavn/module-skill/server';
import { sortBy } from 'es-toolkit';

import { constants, taskApi, unfinishTaskException } from '../../base/index.js';
import { serverModule } from '../module.js';

@serverModule.injectable()
export class GetProjectAndRootTaskService extends BaseService {
  types = {
    earn_1: {
      duration: 1,
      tasks: [
        {
          title: 'Share to friends',
          xp: 50,
          type: 'share',
          metadata: { link: '' },
        },
      ],
    },
    earn_120: {
      duration: 120,
      tasks: [
        {
          title: 'Visit our website',
          xp: 10,
          type: 'open',
          metadata: { link: 'https://unidrop.ai' },
        },
        {
          title: 'Follow us on X',
          xp: 10,
          type: 'open',
          metadata: { link: 'https://x.com/Unidrop_ai' },
        },
        {
          title: 'Follow Unidrop’s Telegram Announcement',
          xp: 10,
          type: 'open',
          metadata: { link: 'https://t.me/UnidropNews' },
        },
        {
          title: 'Follow Unidrop’s Telegram Group Chat',
          xp: 10,
          type: 'open',
          metadata: { link: 'https://t.me/UnidropOfficial' },
        },
        {
          title: 'Join Unidrop Discord',
          xp: 10,
          type: 'open',
          metadata: { link: 'https://discord.gg/SUYr8PeKUE' },
        },
        {
          title: 'Login with Unidrop',
          xp: 50,
          type: 'login_unidrop',
          metadata: { link: 'https://unidrop.ai' },
        },
        {
          title: 'Login with Metaflap',
          xp: 50,
          type: 'login_metaflap',
          metadata: { link: 'https://metaflap.unidrop.ai/game' },
        },
        {
          title: 'Get a daily reward from Unidrop Miner',
          xp: 50,
          type: 'get_a_daily_reward',
          metadata: { link: 'https://und.unidrop.ai/' },
        },
        {
          title: 'Play a match Metaflap',
          xp: 100,
          type: 'play_metaflap',
          metadata: { link: 'https://metaflap.unidrop.ai/game' },
        },
        {
          title: 'Correctly guess the lucky token with Unidrop Miner',
          xp: 100,
          type: 'claim_und',
          metadata: { link: 'https://und.unidrop.ai/' },
        },
      ],
    },
  };

  constructor(
    @inject(GetProjectsService)
    private getProjectsService: GetProjectsService,
    @inject(CreateProjectService)
    private createProjectService: CreateProjectService,
    @inject(GetRootTaskService)
    private getRootTaskService: GetRootTaskService
  ) {
    super();
  }

  async handle(request: { type: keyof GetProjectAndRootTaskService['types'] }) {
    const projects = await this.getProjectsService.handle({
      userId: coreConstants.SYTEM_USER_ID,
      type: request.type,
      orderBy: { id: 'DESC' },
    });
    let project: {
      id: string;
      metadata: {
        tasks: GetProjectAndRootTaskService['types']['earn_120']['tasks'];
      };
    } = projects.items[0] as any;
    let rootTask;
    if (project) {
      rootTask = await this.getRootTaskService.handle({
        projectId: project.id,
      });
    }
    if (!project || (rootTask && rootTask?.expiryDate < new Date())) {
      const metadata = { tasks: this.types[request.type].tasks };
      const newProject = await this.createProjectService.handle({
        name: request.type,
        type: request.type,
        userId: coreConstants.SYTEM_USER_ID,
        duration: this.types[request.type].duration,
        metadata,
      });
      project = { id: newProject.id, metadata };
      rootTask = await this.getRootTaskService.handle({
        projectId: project.id,
      });
    }

    return {
      project: project,
      rootTask: rootTask!,
    };
  }
}

@serverModule.useApi(taskApi.getEarnTasks)
export class GetEarnTasksService extends BaseService {
  constructor(
    @inject(GetProjectAndRootTaskService)
    private getProjectAndRootTaskService: GetProjectAndRootTaskService,
    @inject(GetManyTasksService)
    private getManyTasksService: GetManyTasksService,
    @inject(CreateTaskService)
    private createTaskService: CreateTaskService,
    @inject(AssignTaskService)
    private assignTaskService: AssignTaskService,
    @inject(GetTaskService)
    private getTaskService: GetTaskService
  ) {
    super();
  }

  async handle(
    @AuthRequest request: InferAuthApiRequest<typeof taskApi.getEarnTasks>
  ) {
    const result = await this.getProjectAndRootTaskService.handle({
      type: request.type,
    });
    const tasks = await this.getManyTasksService.handle({
      projectId: result.project.id,
      parentId: result.rootTask.id,
      assigneeId: request.userId,
    });
    let task = tasks.items[0];
    if (!task) {
      const newTask = await this.createTaskService.handle({
        expiryDate: result.rootTask.expiryDate,
        parentId: result.rootTask.id,
        userId: coreConstants.SYTEM_USER_ID,
        title: request.userId,
      });
      await this.assignTaskService.handle({
        id: newTask.id,
        userId: request.userId,
      });

      await Promise.all(
        result.project.metadata.tasks.map(async (item) => {
          const subtask = await this.createTaskService.handle({
            expiryDate: result.rootTask.expiryDate,
            parentId: newTask.id,
            userId: coreConstants.SYTEM_USER_ID,
            title: item.title,
            type: item.type,
            weight: item.xp,
            metadata: item.metadata,
          });
          await this.assignTaskService.handle({
            id: subtask.id,
            userId: request.userId,
          });
        })
      );
      task = await this.getTaskService.handle({ id: newTask.id });
    }
    const subtasks = await this.getManyTasksService.handle({
      parentId: task.id,
      pageSize: 100,
    });
    return { ...task, children: sortBy(subtasks.items, ['finishedDate']) };
  }
}

@serverModule.useApi(taskApi.claim)
export class ClaimEarnTaskService extends BaseService {
  skillId?: string;

  constructor(
    @inject(FinishTaskService)
    private finishTaskService: FinishTaskService,
    @inject(GetTaskService)
    private getTaskService: GetTaskService,
    @inject(UpdateUserSkillService)
    private updateUserSkillService: UpdateUserSkillService,
    @inject(GetSkillsService)
    private getSkillsService: GetSkillsService,
    @inject(CreatePaymentTransactionService)
    private createPaymentTransactionService: CreatePaymentTransactionService
  ) {
    super();
  }

  async handle(
    @AuthRequest request: InferAuthApiRequest<typeof taskApi.claim>
  ) {
    const task = await this.getTaskService.handle({ id: request.id });
    if (task.expiryDate < new Date()) {
      throw badRequestException.make();
    }
    let url;
    switch (task.type) {
      case 'open':
      case 'share':
        break;
      case 'login_unidrop':
        url = 'https://unidrop.ai/__api/metadrop/v1/unidrops/check';
        break;
      case 'login_metaflap':
      case 'play_metaflap':
        url = 'https://metaflap.unidrop.ai/__api/metaflap/v1/unidrops/check';
        break;
      case 'get_a_daily_reward':
      case 'claim_und':
        url = 'https://und.unidrop.ai/__api/lucky/v1/unidrops/check';
        break;
      default:
        throw badRequestException.make();
    }
    if (url) {
      try {
        const resp = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ type: task.type, userId: request.userId }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (resp.status >= 400) {
          const text = await resp.text();
          throw text;
        }
      } catch (e) {
        console.log(e);
        throw unfinishTaskException.make();
      }
    }
    await this.finishTaskService.handle({ id: request.id });

    if (!this.skillId) {
      const skills = await this.getSkillsService.handle({
        name_iContains: constants.SkillTypes.EARN,
      });
      this.skillId = skills.items[0].id;
    }
    const updateResult = await this.updateUserSkillService.handle({
      userId: request.userId,
      amountOfPoint: task.weight,
      skillId: this.skillId,
    });
    if (updateResult.levelChange > 0) {
      await this.createPaymentTransactionService.handle({
        currencyId: constants.EarnLevelUpReward.CURRENCY,
        type: 'earnLevelUp',
        account: {
          userId: request.userId,
          amount: constants.EarnLevelUpReward.AMOUNT,
        },
      });
    }
    return updateResult;
  }
}
