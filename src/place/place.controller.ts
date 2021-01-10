import { Controller, Get, Query } from "@nestjs/common";
import { PlaceService } from "./kakaoMap/search.service";
import { KeywordSearchDto } from "./kakaoMap/search.dto";

@Controller("place")
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get("/search")
  async getPlaceByKeyworld(
    @Query() keywordSearchDto: KeywordSearchDto
  ): Promise<any> {
    // TODO: mongodb cache 추가
    const searchPlaces = await this.placeService.searchByKeyworld(
      keywordSearchDto
    );

    // TODO: api wrap with graphql

    return searchPlaces.data;
  }
}
