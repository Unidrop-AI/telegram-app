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
import { WriteContractService } from '@roxavn/module-web3/server';
import {
  badRequestException,
  constants as coreConstants,
  expiredException,
  forbiddenException,
  InferApiRequest,
  type InferAuthApiRequest,
} from '@roxavn/core';
import { AuthRequest, BaseService, inject } from '@roxavn/core/server';
import { CreatePaymentTransactionService } from '@roxavn/plugin-payment/server';

import { serverModule } from '../module.js';
import {
  constants,
  feeAirdropApi,
  unfinishTaskException,
} from '../../base/index.js';
import {
  GetFollowerDiscordService,
  GetFollowerTelegramService,
} from './followers.js';

@serverModule.useApi(feeAirdropApi.getMany)
export class GetFeeAirdropsService extends BaseService {
  constructor(
    @inject(GetProjectsService)
    private getProjectsService: GetProjectsService
  ) {
    super();
  }

  async handle(request: InferApiRequest<typeof feeAirdropApi.getMany>) {
    return this.getProjectsService.handle({
      ...request,
      type: 'feeAirdrop',
    });
  }
}

@serverModule.useApi(feeAirdropApi.create)
export class CreateFeeAirdropsService extends BaseService {
  constructor(
    @inject(CreateProjectService)
    private createProjectService: CreateProjectService
  ) {
    super();
  }

  async handle(request: InferApiRequest<typeof feeAirdropApi.create>) {
    return this.createProjectService.handle({
      ...request,
      duration: 999999,
      isPublic: false,
      type: 'feeAirdrop',
      userId: coreConstants.SYTEM_USER_ID,
    });
  }
}

@serverModule.useApi(feeAirdropApi.getUserTask)
export class GetUserTaskService extends BaseService {
  constructor(
    @inject(GetManyTasksService)
    private getManyTasksService: GetManyTasksService
  ) {
    super();
  }

  async handle(
    @AuthRequest request: InferAuthApiRequest<typeof feeAirdropApi.getUserTask>
  ) {
    const { items } = await this.getManyTasksService.handle({
      projectId: request.id,
      assigneeId: request.userId,
      type: 'feeAirdrop',
    });
    if (items.length) {
      return items[0];
    }
    return {};
  }
}

@serverModule.useApi(feeAirdropApi.createUserTask)
export class CreateUserTaskService extends BaseService {
  constructor(
    @inject(GetManyTasksService)
    private getManyTasksService: GetManyTasksService,
    @inject(GetProjectService)
    private getProjectService: GetProjectService,
    @inject(CreatePaymentTransactionService)
    private createPaymentTransactionService: CreatePaymentTransactionService,
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
    request: InferAuthApiRequest<typeof feeAirdropApi.createUserTask>
  ) {
    const project = await this.getProjectService.handle({ id: request.id });
    const { items } = await this.getManyTasksService.handle({
      projectId: request.id,
      assigneeId: request.userId,
      type: 'feeAirdrop',
    });
    if (items.length) {
      throw badRequestException.make();
    }
    await this.createPaymentTransactionService.handle({
      currencyId: constants.Currencies.UND,
      type: 'feeAirdrop',
      account: {
        userId: request.userId,
        amount: -project.metadata!.fee,
      },
    });
    const rootTask = await this.getRootTaskService.handle({
      projectId: project.id,
    });
    const newTask = await this.createTaskService.handle({
      expiryDate: new Date(2999, 1, 1),
      parentId: rootTask.id,
      userId: coreConstants.SYTEM_USER_ID,
      title: request.userId,
      type: 'feeAirdrop',
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

@serverModule.useApi(feeAirdropApi.getUserSubtasks)
export class CreateUserSubtasksService extends BaseService {
  constructor(
    @inject(GetManyTasksService)
    private getManyTasksService: GetManyTasksService
  ) {
    super();
  }
  async handle(request: InferApiRequest<typeof feeAirdropApi.getUserSubtasks>) {
    const { items } = await this.getManyTasksService.handle({
      parentId: request.taskId,
      pageSize: 100,
    });
    return { items };
  }
}

@serverModule.useApi(feeAirdropApi.inprogress)
export class InprogressFeeAirdropService extends BaseService {
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

  async handle(request: InferApiRequest<typeof feeAirdropApi.inprogress>) {
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

@serverModule.useApi(feeAirdropApi.claim)
export class ClaimFeeAirdropService extends BaseService {
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
    @AuthRequest request: InferAuthApiRequest<typeof feeAirdropApi.claim>
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

@serverModule.useApi(feeAirdropApi.finish)
export class FinishFeeAirdropService extends BaseService {
  constructor(
    @inject(FinishTaskService)
    private finishTaskService: FinishTaskService,
    @inject(UpdateTaskMetadataService)
    private updateTaskMetadataService: UpdateTaskMetadataService,
    @inject(GetProjectService)
    private getProjectService: GetProjectService,
    @inject(WriteContractService)
    private writeContractService: WriteContractService,
    @inject(GetTaskService)
    private getTaskService: GetTaskService
  ) {
    super();
  }

  async handle(
    @AuthRequest request: InferAuthApiRequest<typeof feeAirdropApi.finish>
  ) {
    const task = await this.getTaskService.handle({ id: request.taskId });
    if (task.assigneeId !== request.userId && task.type === 'feeAirdrop') {
      throw forbiddenException.make();
    }
    await this.finishTaskService.handle({ id: request.taskId });
    const project = await this.getProjectService.handle({ id: task.projectId });
    const result = await this.writeContractService.handle({
      contract: {
        address: project.metadata?.tokenAddress,
        networkId: project.metadata?.networkId,
      },
      functionName: 'transfer',
      args: [
        request.address,
        (BigInt(project.metadata?.tokenAmount) *
          BigInt(10) ** BigInt(project.metadata?.tokenDecimals)) /
          BigInt(project.metadata?.slot),
      ],
    });
    await this.updateTaskMetadataService.handle({
      id: request.taskId,
      metadata: { transactionHash: result.transactionHash },
    });
    return {};
  }
}
