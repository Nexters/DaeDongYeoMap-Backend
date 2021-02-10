import { InputType, Field } from "@nestjs/graphql";
import * as mongoose from "mongoose";

@InputType()
export class CreateCourseInput {
  @Field(() => [String], {
    description: "list of sticker ids(순서 중요)",
  })
  stickers: mongoose.Types.ObjectId[];

  @Field(() => String)
  title: string;

  @Field(() => Boolean)
  is_share: boolean;

  // @Field(() => String, {
  //   description: "스티커를 생성한 User",
  // })
  // owner: mongoose.Types.ObjectId;
}
