import { InputType, Field } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { CreateCourseImageInput } from "../dto/create-course-image.input";

@InputType()
export class CourseInput {
  @Field(() => String, {
    description: "코스 id",
  })
  courseId: String;

  @Field(() => CreateCourseImageInput, {
    nullable: true,
    description: "course input을 채우면, 이미지 url을 생성하여 전달합니다.",
  })
  courseImageInput?: CreateCourseImageInput;
}
