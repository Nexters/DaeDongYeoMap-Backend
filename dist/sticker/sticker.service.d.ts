import { Model, Types } from "mongoose";
import { CreateStickerInput, UpdateStickerInput } from "./dto/sticker.input";
import { Sticker, StickerDocument } from "./entities/sticker.entity";
import { SpotService } from "../spot/spot.service";
import { Spot } from "../spot/entities/spot.entity";
export declare class StickerService {
    private stickerModel;
    private readonly spotService;
    constructor(stickerModel: Model<StickerDocument>, spotService: SpotService);
    create(createStickerInput: CreateStickerInput): Promise<StickerDocument>;
    update(updateStickerInput: UpdateStickerInput): Promise<Sticker>;
    findOne(_id: Types.ObjectId): Promise<Sticker>;
    findAll(ids?: Types.ObjectId[] | null): Promise<Sticker[]>;
    getAllSpots(stickerIds: Types.ObjectId[]): Promise<Spot[]>;
}
