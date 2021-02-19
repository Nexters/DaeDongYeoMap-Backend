import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from "@nestjs/graphql";

import { CourseService } from "./course.service";
import { Course, CourseDocument } from "./entities/course.entity";
import { CreateCourseInput } from "./dto/create-course.input";
import { CourseInput } from "./dto/course.input";
import { SpotService } from "../spot/spot.service";
import { Spot } from "../spot/entities/spot.entity";
import { Sticker } from "../sticker/entities/sticker.entity";

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course, {
    description:
      "Sticker를 사용하여 코스를 생성합니다. 이때 코스의 순서는 전달된 스티커들의 순서로 처리됩니다.",
  })
  async createCourse(
    @Args("createCourseInput") createCourseInput: CreateCourseInput
  ): Promise<Course> {
    return await this.courseService.create(createCourseInput);
  }

  @Query(() => [Course], { name: "courses" })
  async findAll(): Promise<Course[]> {
    return await this.courseService.findAll();
  }

  @Query(() => Course, {
    name: "course",
    description: "a Course",
  })
  async findOne(
    @Args("courseInput") courseInput: CourseInput
  ): Promise<Course> {
    const course = await this.courseService.findOne(courseInput.courseId);
    if (courseInput.courseImageInput) {
      course.courseImage = await this.courseService.getCourseStaticUrl(
        course,
        courseInput.courseImageInput
      );
    }
    return course;
  }

  @ResolveField(() => [Sticker], {
    description: "populate: true 경우 sticker값을 치환하여 반환합니다.",
  })
  async stickers(
    @Parent() course: CourseDocument,
    @Args({ name: "populate", nullable: true, defaultValue: false })
    populate: boolean
  ) {
    if (populate) {
      return await this.courseService.populateStickers(course._id);
    }
    return course.stickers;
  }

  // @Mutation(() => Course)
  // updateCourse(@Args('updateCourseInput') updateCourseInput: UpdateCourseInput) {
  //   return this.courseService.update(updateCourseInput.id, updateCourseInput);
  // }

  // @Mutation(() => Course)
  // removeCourse(@Args('id', { type: () => Int }) id: number) {
  //   return this.courseService.remove(id);
  // }
}
