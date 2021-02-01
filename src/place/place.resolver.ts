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
    const places: Place[] = await this.searchService.searchByKeyword(filters);
    places.forEach(async (place) => {
      const cachedPlace:
        | Place
        | undefined = await this.searchService.getPlaceFromCacheById(place.id);
      cachedPlace || this.searchService.setPlaceFromCacheById(place.id, place);
    });
    return places;
  }

  @Query(() => Place)
  async getPlaceFromCache(
    @Args("place_id", { type: () => String }) place_id: string
  ): Promise<Place | HttpException> {
    const cachedPlace: Place | null = await this.searchService.getPlaceFromCacheById(
      place_id
    );

    if (cachedPlace === undefined) {
      return new HttpException(
        `There is no cached place with ${place_id}`,
        HttpStatus.BAD_REQUEST
      );
    }
    return cachedPlace;
  }
}
