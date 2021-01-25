import { ObjectType, Field, Int } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Spot } from "src/spot/entities/spot.entity";
@ObjectType({
  description: "Spot들을 순서대로 저장하고 있는 데이터 코스 정보",
})
@Schema({ timestamps: true })
export class Course {
  @Field(() => [Spot], { description: "순서를 가진 스팟id를 담고 있는 리스트" })
  @Prop({ type: [mongoose.Types.ObjectId], ref: Spot })
  spots: mongoose.Types.ObjectId[];

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String)
  @Prop({ default: true })
  isPrivate: boolean;

  // users: User[]
}

export type CourseDocument = Course & mongoose.Document;
export const CourseSchema = SchemaFactory.createForClass(Course);
