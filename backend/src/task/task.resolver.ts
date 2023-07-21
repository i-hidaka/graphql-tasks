import { CreateTaskInput } from './dto/createTask.input';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './models/task.model';

// controllerの役割
@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  // Graphqlにメソッドを伝える
  // 第1引数・・・返り値の型　第2引数・・・オプション
  @Query(() => [Task], { nullable: 'items' })
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput): Task {
    return this.taskService.createTask(createTaskInput);
  }
}
