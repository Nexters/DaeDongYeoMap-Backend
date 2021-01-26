import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CourseService } from "./course.service";
import { Course } from "./entities/course.entity";
import { CreateCourseInput } from "./dto/create-course.input";
import { UpdateCourseInput } from "./dto/update-course.input";

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course, {
    description:
      "코스를 생성합니다. 이때 스팟의 순서는 전달된 스팟 아이디의 index로 처리됩니다.",
  })
  async createCourse(
    @Args("createCourseInput") createCourseInput: CreateCourseInput
  ): Promise<Course> {
    return await this.courseService.create(createCourseInput);
  }

  // @Query(() => [Course], { name: 'course' })
  // findAll() {
  //   return this.courseService.findAll();
  // }

  // @Query(() => Course, { name: 'course' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.courseService.findOne(id);
  // }

  // @Mutation(() => Course)
  // updateCourse(@Args('updateCourseInput') updateCourseInput: UpdateCourseInput) {
  //   return this.courseService.update(updateCourseInput.id, updateCourseInput);
  // }

  // @Mutation(() => Course)
  // removeCourse(@Args('id', { type: () => Int }) id: number) {
  //   return this.courseService.remove(id);
  // }
}
