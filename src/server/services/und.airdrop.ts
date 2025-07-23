import {
  CreateProjectService,
  GetProjectService,
  GetManyTasksService,
  GetProjectsService,
  GetRootTaskService,
  CreateTaskService,
  AssignTaskService,
  FinishTaskService,
  GetTaskService,
  UpdateTaskMetadataService,
  InprogressTaskService,
} from '@roxavn/module-project/server';
import {
  badRequestException,
  constants as coreConstants,
  expiredException,
  forbiddenException,
  InferApiRequest,
  type InferAuthApiRequest,
} from '@roxavn/core';
import {
  AuthRequest,
  BaseService,
  inject,
  InjectDatabaseService,
  sql,
} from '@roxavn/core/server';
import { CreatePaymentTransactionService } from '@roxavn/plugin-payment/server';

import { serverModule } from '../module.js';
import {
  constants,
  undAirdropApi,
  unfinishTaskException,
} from '../../base/index.js';
import {
  GetFollowerDiscordService,
  GetFollowerTelegramService,
} from './followers.js';

@serverModule.useApi(undAirdropApi.getMany)
export class GetUndAirdropsService extends BaseService {
  constructor(
    @inject(GetProjectsService)
    private getProjectsService: GetProjectsService
  ) {
    super();
  }

  async handle(request: InferApiRequest<typeof undAirdropApi.getMany>) {
    return this.getProjectsService.handle({
      ...request,
      type: 'undAirdrop',
    });
  }
}

@serverModule.useApi(undAirdropApi.create)
export class CreateUndAirdropsService extends BaseService {
  constructor(
    @inject(CreateProjectService)
    private createProjectService: CreateProjectService
  ) {
    super();
  }

  async handle(request: InferApiRequest<typeof undAirdropApi.create>) {
    return this.createProjectService.handle({
      ...request,
      duration: 999999,
      isPublic: false,
      type: 'undAirdrop',
      userId: coreConstants.SYTEM_USER_ID,
    });
  }
}

@serverModule.useApi(undAirdropApi.getUserTask)
export class GetUserTaskUndService extends BaseService {
  constructor(
    @inject(GetManyTasksService)
    private getManyTasksService: GetManyTasksService
  ) {
    super();
  }

  async handle(
    @AuthRequest request: InferAuthApiRequest<typeof undAirdropApi.getUserTask>
  ) {
    const { items } = await this.getManyTasksService.handle({
      projectId: request.id,
      assigneeId: request.userId,
      type: 'undAirdrop',
    });
    if (items.length) {
      return items[0];
    }
    return {};
  }
}

@serverModule.useApi(undAirdropApi.createUserTask)
export class CreateUserTaskUndService extends BaseService {
  constructor(
    @inject(GetManyTasksService)
    private getManyTasksService: GetManyTasksService,
    @inject(GetProjectService)
    private getProjectService: GetProjectService,
    @inject(GetRootTaskService)
    private getRootTaskService: GetRootTaskService,
    @inject(CreateTaskService)
    private createTaskService: CreateTaskService,
    @inject(AssignTaskService)
    private assignTaskService: AssignTaskService
  ) {
    super();
  }

  async handle(
    @AuthRequest
    request: InferAuthApiRequest<typeof undAirdropApi.createUserTask>
  ) {
    const project = await this.getProjectService.handle({ id: request.id });
    const { items } = await this.getManyTasksService.handle({
      projectId: request.id,
      assigneeId: request.userId,
      type: 'undAirdrop',
    });
    if (items.length) {
      throw badRequestException.make();
    }
    const rootTask = await this.getRootTaskService.handle({
      projectId: project.id,
    });
    const newTask = await this.createTaskService.handle({
      expiryDate: new Date(2999, 1, 1),
      parentId: rootTask.id,
      userId: coreConstants.SYTEM_USER_ID,
      title: request.userId,
      type: 'undAirdrop',
    });
    await this.assignTaskService.handle({
      id: newTask.id,
      userId: request.userId,
    });
    const tasks = [] as Array<{ title: string; type: string; metadata: any }>;
    if (project.metadata?.links) {
      project.metadata?.links.map((linkData: any) =>
        tasks.push({
          title: linkData.title,
          type: 'link',
          metadata: { link: linkData.link },
        })
      );
    }
    if (project.metadata?.linkX) {
      tasks.push({
        title: 'Follow us on X',
        type: 'linkX',
        metadata: { id: project.metadata.linkX },
      });
    }
    if (project.metadata?.linkDiscord) {
      tasks.push({
        title: 'Follow us on Discord',
        type: 'linkDiscord',
        metadata: {
          id: project.metadata.linkDiscord,
          inviteDiscord: project.metadata.inviteDiscord,
        },
      });
    }
    if (project.metadata?.linkTelegram) {
      tasks.push({
        title: 'Follow us on Telegram',
        type: 'linkTelegram',
        metadata: {
          id: project.metadata.linkTelegram,
          inviteTelegram: project.metadata.inviteTelegram,
        },
      });
    }
    await Promise.all(
      tasks.map(async (item) => {
        const subtask = await this.createTaskService.handle({
          expiryDate: new Date(2998, 1, 1),
          parentId: newTask.id,
          userId: coreConstants.SYTEM_USER_ID,
          title: item.title,
          type: item.type,
          metadata: item.metadata,
        });
        await this.assignTaskService.handle({
          id: subtask.id,
          userId: request.userId,
        });
      })
    );

    return { id: newTask.id };
  }
}

@serverModule.useApi(undAirdropApi.getUserSubtasks)
export class CreateUserSubtasksUndService extends BaseService {
  constructor(
    @inject(GetManyTasksService)
    private getManyTasksService: GetManyTasksService
  ) {
    super();
  }
  async handle(request: InferApiRequest<typeof undAirdropApi.getUserSubtasks>) {
    const { items } = await this.getManyTasksService.handle({
      parentId: request.taskId,
      pageSize: 100,
    });
    return { items };
  }
}

@serverModule.useApi(undAirdropApi.inprogress)
export class InprogressUndAirdropService extends BaseService {
  constructor(
    @inject(InprogressTaskService)
    private inprogressTaskService: InprogressTaskService,
    @inject(GetTaskService)
    private getTaskService: GetTaskService,
    @inject(UpdateTaskMetadataService)
    private updateTaskMetadataService: UpdateTaskMetadataService,
    @inject(GetFollowerTelegramService)
    private getFollowerTelegramService: GetFollowerTelegramService,
    @inject(GetFollowerDiscordService)
    private getFollowerDiscordService: GetFollowerDiscordService
  ) {
    super();
  }

  async handle(request: InferApiRequest<typeof undAirdropApi.inprogress>) {
    await this.inprogressTaskService.handle({ id: request.taskId });
    const task = await this.getTaskService.handle({ id: request.taskId });
    let count;
    if (task.type === 'linkDiscord') {
      count = await this.getFollowerDiscordService.handle({
        serverId: task.metadata!.id,
      });
    } else if (task.type === 'linkTelegram') {
      count = await this.getFollowerTelegramService.handle({
        channelName: task.metadata!.id,
      });
    }
    if (count) {
      await this.updateTaskMetadataService.handle({
        id: request.taskId,
        metadata: { ...task.metadata, count },
      });
    }
    return {};
  }
}

@serverModule.useApi(undAirdropApi.claim)
export class ClaimUndAirdropService extends BaseService {
  constructor(
    @inject(FinishTaskService)
    private finishTaskService: FinishTaskService,
    @inject(GetTaskService)
    private getTaskService: GetTaskService,
    @inject(GetFollowerTelegramService)
    private getFollowerTelegramService: GetFollowerTelegramService,
    @inject(GetFollowerDiscordService)
    private getFollowerDiscordService: GetFollowerDiscordService
  ) {
    super();
  }

  async handle(
    @AuthRequest request: InferAuthApiRequest<typeof undAirdropApi.claim>
  ) {
    const task = await this.getTaskService.handle({ id: request.taskId });
    if (!task.startedDate) {
      throw badRequestException.make();
    }
    if (task.startedDate.getTime() + 60 * 1000 * 15 < new Date().getTime()) {
      throw expiredException.make();
    }
    let count;
    if (task.type === 'linkDiscord') {
      count = await this.getFollowerDiscordService.handle({
        serverId: task.metadata!.id,
      });
    } else if (task.type === 'linkTelegram') {
      count = await this.getFollowerTelegramService.handle({
        channelName: task.metadata!.id,
      });
    }
    if (count) {
      if (count <= task.metadata!.count) {
        throw unfinishTaskException.make();
      }
    }
    await this.finishTaskService.handle({ id: request.taskId });
    return {};
  }
}

@serverModule.useApi(undAirdropApi.finish)
export class FinishUndAirdropService extends BaseService {
  constructor(
    @inject(FinishTaskService)
    private finishTaskService: FinishTaskService,
    @inject(UpdateTaskMetadataService)
    private updateTaskMetadataService: UpdateTaskMetadataService,
    @inject(GetProjectService)
    private getProjectService: GetProjectService,
    @inject(CreatePaymentTransactionService)
    private createPaymentTransactionService: CreatePaymentTransactionService,
    @inject(GetTaskService)
    private getTaskService: GetTaskService
  ) {
    super();
  }

  async handle(
    @AuthRequest request: InferAuthApiRequest<typeof undAirdropApi.finish>
  ) {
    const task = await this.getTaskService.handle({ id: request.taskId });
    if (task.assigneeId !== request.userId && task.type === 'undAirdrop') {
      throw forbiddenException.make();
    }
    await this.finishTaskService.handle({ id: request.taskId });
    const project = await this.getProjectService.handle({ id: task.projectId });
    const result = await this.createPaymentTransactionService.handle({
      currencyId: constants.Currencies.UND,
      type: 'undAirdrop',
      account: {
        userId: request.userId,
        amount: project.metadata!.und,
      },
    });
    await this.updateTaskMetadataService.handle({
      id: request.taskId,
      metadata: { transactionId: result.id },
    });
    return {};
  }
}

@serverModule.useApi(undAirdropApi.stats)
export class GetStatsUndAirdropService extends InjectDatabaseService {
  async handle(request: InferApiRequest<typeof undAirdropApi.stats>) {
    const query = this.dbSession
      .selectFrom('project')
      .select(['id', 'name', 'createdDate', 'metadata'])
      .where('type', '=', 'undAirdrop')
      .where(sql`metadata->>'partnerId'`, '=', request.userId);
    const result = await this.databaseService.utils.getPaginationResponse(
      query,
      { page: request.page, pageSize: request.pageSize }
    );

    const stats = result.items.length
      ? await this.dbSession
          .selectFrom('task')
          .where(
            'task.projectId',
            'in',
            result.items.map((item) => item.id)
          )
          .where('task.type', '=', 'undAirdrop')
          .groupBy('task.projectId')
          .select('projectId')
          .select((eb) =>
            eb.fn.count<number>('task.id').as('participantsCount')
          )
          .execute()
      : [];

    return {
      pagination: result.pagination,
      items: result.items.map((item) => ({
        ...item,
        participantsCount:
          stats.find((s) => s.projectId == item.id)?.participantsCount || 0,
      })),
    };
  }
}
