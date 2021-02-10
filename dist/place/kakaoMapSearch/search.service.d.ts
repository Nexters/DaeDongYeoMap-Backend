import { Cache } from "cache-manager";
import { ConfigService } from "@nestjs/config";
import { CreateSpotInput } from "../../spot/dto/create-spot.input";
import { KeywordSearchDto } from "./search.dto";
import { Place } from "../place.entity";
export declare class SearchService {
    private readonly cache;
    private configService;
    constructor(cache: Cache, configService: ConfigService);
    searchByKeyword(keywordSearchDto: KeywordSearchDto): Promise<Place[]>;
    setPlaceFromCacheById(key: any, value: any): Promise<void>;
    getPlaceFromCacheById(id: any): Promise<Place>;
    getIdenticalPlace(createSpotInput: CreateSpotInput): Promise<Place | null>;
}
