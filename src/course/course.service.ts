import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { CreateCourseInput } from "./dto/create-course.input";
import { UpdateCourseInput } from "./dto/update-course.input";

@Injectable()
export class CourseService {
  // constructor(
  //   @InjectModel(Spot.name) private spotModel: Model<CDocument>,
  //   private readonly searchService: SearchService
  // ) {}

  create(createCourseInput: CreateCourseInput) {
    return "This action adds a new course";
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseInput: UpdateCourseInput) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
