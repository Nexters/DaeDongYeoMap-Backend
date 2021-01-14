import { Args, Query, Resolver } from "@nestjs/graphql";

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

    for await (let p of places) {
      const isCached = await this.searchService.getPlaceFromCacheById(p.id);
      console.log(isCached);
      if (isCached) continue;
      this.searchService.setPlaceFromCacheById(p.id, p);
    }
    return places;
  }

  // get place from cache (for test)
  @Query(() => Place)
  async getPlace(
    @Args("placeId", { type: () => String }) placeId: string
  ): Promise<Place | void> {
    return await this.searchService.getPlaceFromCacheById(placeId);
  }
}
