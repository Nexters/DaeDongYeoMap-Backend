import { HttpException, HttpStatus } from "@nestjs/common";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { AppService } from "./app.service";

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}
  @Mutation(() => Number, {
    name: "dummy",
    description: "dummy 데이터를 생성합니다.",
  })
  async createDummy(@Args("keyword") keyword: String) {
    await this.appService.createDummy(keyword);
    return 1;
  }
}
