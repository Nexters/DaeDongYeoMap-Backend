import { HttpException } from "@nestjs/common";
import { Place } from "./place.entity";
import { SearchService } from "./kakaoMapSearch/search.service";
import { KeywordSearchDto } from "./kakaoMapSearch/search.dto";
export declare class PlaceResolver {
    private readonly searchService;
    constructor(searchService: SearchService);
    getPlacesByKeyword(filters: KeywordSearchDto): Promise<object>;
    getPlaceFromCache(place_id: string): Promise<Place | HttpException>;
}
