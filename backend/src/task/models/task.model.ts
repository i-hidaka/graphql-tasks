import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Status } from '@prisma/client';

// クラスからGraphqlスキーマを作成する
@ObjectType()
export class Task {
  // Graphqlスキーマ作成の際に、number型はデフォルトだとFloat型になってしまうので指定
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  dueDate: string;

  @Field()
  status: Status;

  // nullを許容
  @Field({ nullable: true })
  description: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
