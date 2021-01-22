import { Args, Query, Resolver } from "@nestjs/graphql";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Place } from "./place.entity";
import { SearchService } from "./kakaoMapSearch/search.service";
import { KeywordSearchDto } from "./kakaoMapSearch/search.dto";

@Resolver(() => Place)
export class PlaceResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [Place])
  async placesByKeyworld(
    @Args("filters") filters: KeywordSearchDto
  ): Promise<object> {
    const places: any = await this.searchService.searchByKeyworld(filters);
    console.log(places);

    for (let p of places) {
      const isCached = await this.searchService.getPlaceFromCacheById(p.id);
      if (isCached) continue;

      this.searchService.setPlaceFromCacheById(p.id, p);
    }
    return places;
  }

  @Query(() => Place)
  async getPlace(
    @Args("placeId", { type: () => String }) placeId: string
  ): Promise<Place | HttpException> {
    const place: Place = await this.searchService.getPlaceFromCacheById(
      placeId
    );

    if (place === undefined) {
      return new HttpException(
        `There is no cached place with ${placeId}`,
        HttpStatus.BAD_REQUEST
      );
    }
    return place;
  }
}
