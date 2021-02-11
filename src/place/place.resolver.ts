import { Args, Query, Resolver } from "@nestjs/graphql";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Place } from "./place.entity";
import { SearchService } from "./kakaoMapSearch/search.service";
import { KeywordSearchDto } from "./kakaoMapSearch/search.dto";

@Resolver(() => Place)
export class PlaceResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [Place], {
    description:
      "키워드로 위치 정보를 확인합니다. \n내부적으로 카카오 API를 요청합니다.",
  })
  async getPlacesByKeyword(
    @Args("filters") filters: KeywordSearchDto
  ): Promise<object> {
    return await this.searchService.searchByKeyword(filters);
  }
}
