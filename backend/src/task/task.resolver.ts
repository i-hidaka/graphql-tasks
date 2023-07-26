import { CreateTaskInput } from './dto/createTask.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task as TaskModel } from './models/task.model';
import { Task } from '@prisma/client';
import { UpdateTaskInput } from './dto/updateTask.input';

// controllerの役割
// query データ取得（GET）、mutation データ追加、作成、削除（GET、POST、DELETE）
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

  @Mutation(() => TaskModel)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<Task> {
    return await this.taskService.updateTask(updateTaskInput);
  }

  @Mutation(() => TaskModel)
  async deleteTask(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return await this.taskService.deleteTask(id);
  }
}
