import { CreateCourseInput } from "./create-course.input";
import * as mongoose from "mongoose";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateCourseInput extends PartialType(CreateCourseInput) {
  @Field(() => String, { description: "Course id" })
  _id: mongoose.Types.ObjectId;
}
