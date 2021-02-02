import { InputType, Field } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Prop } from "@nestjs/mongoose";
import { Spot } from "src/spot/entities/spot.entity";
import { Sticker } from "../../sticker/entities/sticker.entity";

@InputType()
export class CreateCourseInput {
  @Field(() => [String], {
    description: "list of sticker ids(순서 중요)",
  })
  stickers: mongoose.Types.ObjectId[];

  @Field(() => String)
  title: string;

  @Field(() => String)
  isPrivate: boolean;

  // @Field(() => String, {
  //   description: "스티커를 생성한 User",
  // })
  // owner: mongoose.Types.ObjectId;
}
