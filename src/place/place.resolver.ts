import { Args, Query, Resolver } from "@nestjs/graphql";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Place } from "./place.entity";
import { SearchService } from "./kakaoMapSearch/search.service";
import { KeywordSearchDto } from "./kakaoMapSearch/search.dto";

@Resolver(() => Place)
export class PlaceResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [Place])
  async getPlacesByKeyword(
    @Args("filters") filters: KeywordSearchDto
  ): Promise<object> {
    const places: Place[] = await this.searchService.searchByKeyword(filters);
    places.forEach(async (place) => {
      const cachedPlace: Place | null = await this.searchService.getPlaceFromCacheById(
        place.id
      );
      const isCached = cachedPlace !== null;
      isCached || this.searchService.setPlaceFromCacheById(place.id, place);
    });
    return places;
  }

  @Query(() => Place)
  async getPlaceFromCache(
    @Args("placeId", { type: () => String }) placeId: string
  ): Promise<Place | HttpException> {
    const cachedPlace: Place | null = await this.searchService.getPlaceFromCacheById(
      placeId
    );

    if (cachedPlace === undefined) {
      return new HttpException(
        `There is no cached place with ${placeId}`,
        HttpStatus.BAD_REQUEST
      );
    }
    return cachedPlace;
  }
}
