import { CreateTaskInput } from './dto/createTask.input';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task as TaskModel } from './models/task.model';
import { Task } from '@prisma/client';

// controllerの役割
@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  // Graphqlにメソッドを伝える
  // 第1引数・・・返り値の型　第2引数・・・オプション
  @Query(() => [TaskModel], { nullable: 'items' })
  async getTasks(): Promise<Task[]> {
    return await this.taskService.getTasks();
  }

  @Mutation(() => TaskModel)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskInput);
  }
}
