/// <reference types="mongoose" />
import { SpotService } from "../spot/spot.service";
import { Spot, SpotDocument } from "../spot/entities/spot.entity";
import { Sticker } from "../sticker/entities/sticker.entity";
export declare class SpotResolver {
    private readonly spotService;
    constructor(spotService: SpotService);
    getAllSpots(): Promise<Spot[]>;
    removeSpot(id: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
    getSpotsByKeyword(keyword: string): Promise<Spot[]>;
    findOne(place_id: string): Promise<void>;
    stickers(spot: SpotDocument, populate: boolean): Promise<import("mongoose").Types.ObjectId[] | Sticker[]>;
}
