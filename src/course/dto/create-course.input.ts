import { InputType, Field } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Prop } from "@nestjs/mongoose";
import { Spot } from "src/spot/entities/spot.entity";

@InputType()
export class CreateCourseInput {
  @Field(() => [String], {
    description: "스팟들의 ID를 담고 있는 리스트(순서 포함)",
  })
  spots: mongoose.Types.ObjectId[];

  @Field(() => String)
  title: string;

  @Field(() => String)
  isPrivate: boolean;

  // users: User[]
}
