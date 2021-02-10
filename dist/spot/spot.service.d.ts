import { Model, Types } from "mongoose";
import { SearchService } from "../place/kakaoMapSearch/search.service";
import { CreateSpotInput } from "../spot/dto/create-spot.input";
import { Spot, SpotDocument } from "../spot/entities/spot.entity";
import { Sticker } from "../sticker/entities/sticker.entity";
export declare class SpotService {
    private spotModel;
    private readonly searchService;
    constructor(spotModel: Model<SpotDocument>, searchService: SearchService);
    document(createSpotInput: CreateSpotInput): Promise<SpotDocument>;
    save(spotDocument: SpotDocument): Promise<Spot>;
    appendSticker(spotId: Types.ObjectId, stickerId: Types.ObjectId): Promise<Spot>;
    findOne(_id: Types.ObjectId): Promise<Spot>;
    findOneByPlaceId(place_id: string): Promise<Spot>;
    findAll(ids?: Types.ObjectId[] | null): Promise<Spot[]>;
    remove(place_id: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
    getByKeyword(keyword: string): Promise<Spot[]>;
    populateStickers(spot_id: Types.ObjectId): Promise<Sticker[]>;
}
