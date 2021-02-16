import { ObjectType, Field } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType({
  description: "스티커(스팟)을 순서대로 저장하고 있는 데이터 코스 정보",
})
@Schema({ timestamps: true })
export class Course {
  @Field(() => String, { description: "Course id" })
  _id: mongoose.Types.ObjectId;

  @Field(() => [String], {
    description: "list of sticker ids(순서 중요)",
  })
  @Prop({ type: [mongoose.Types.ObjectId], ref: "Sticker" })
  stickers: mongoose.Types.ObjectId[];

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => Boolean, {
    description: "list of sticker ids(순서 중요)",
  })
  @Prop({ default: false })
  is_share: boolean;

  @Field(() => String, { description: "course의 image url", defaultValue: "" })
  courseImage: String;

  // @Field(() => String, {
  //   description: "스티커를 생성한 User",
  // })
  // @Prop({ type: mongoose.Types.ObjectId, ref: "User" })
  // owner: mongoose.Types.ObjectId;
}

export type CourseDocument = Course & mongoose.Document;
export const CourseSchema = SchemaFactory.createForClass(Course);
