import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "./kakaoMap/search.service";
import { KeywordSearchDto } from "./kakaoMap/search.dto";

@Controller("place")
export class PlaceController {
  constructor(private readonly searchService: SearchService) {}

  @Get("/search")
  async getPlaceByKeyworld(
    @Query() keywordSearchDto: KeywordSearchDto
  ): Promise<any> {
    // TODO: mongodb cache 추가
    const searchedPlaces = await this.searchService.searchByKeyworld(
      keywordSearchDto
    );

    // TODO: api wrap with graphql

    return searchedPlaces.data;
  }
}
