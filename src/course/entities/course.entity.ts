import { ObjectType, Field } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Spot } from "src/spot/entities/spot.entity";

@ObjectType({
  description: "Spot들을 순서대로 저장하고 있는 데이터 코스 정보",
})
@Schema({ timestamps: true })
export class Course {
  @Field(() => String, { description: "Course id" })
  _id: mongoose.Types.ObjectId;

  @Field(() => [Spot], {
    description: "스팟들의 ID를 담고 있는 리스트(순서 포함)",
  })
  @Prop({ type: [mongoose.Types.ObjectId], ref: "Spot" })
  spots: mongoose.Types.ObjectId[];

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => Boolean)
  @Prop({ default: true })
  isPrivate: boolean;

  // user: User
}

export type CourseDocument = Course & mongoose.Document;
export const CourseSchema = SchemaFactory.createForClass(Course);
