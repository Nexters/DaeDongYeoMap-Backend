import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { Place } from "./place.model";
import { SearchService } from "./kakaoMapSearch/search.service";
import { KeywordSearchDto } from "./kakaoMapSearch/search.dto";

@Resolver(() => Place)
export class PlaceResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [Place])
  async placesByKeyworld(
    @Args("filters") filters: KeywordSearchDto
  ): Promise<object> {
    const searchedPlaces = await this.searchService.searchByKeyworld(filters);

    searchedPlaces.data.forEach((place:Place) => {
      
      if ()

    })

    const cachedPlaces = await this.searchService.cachePlaces(
      searchedPlaces,
      12
    );

    return cachedPlaces;
  }
}
