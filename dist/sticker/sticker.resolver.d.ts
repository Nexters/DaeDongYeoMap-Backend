import { Types } from "mongoose";
import { SpotService } from "src/spot/spot.service";
import { Spot } from "src/spot/entities/spot.entity";
import { StickerService } from "src/sticker/sticker.service";
import { Sticker, StickerDocument } from "./entities/sticker.entity";
import { CreateStickerInput, UpdateStickerInput } from "./dto/sticker.input";
export declare class StickerResolver {
    private readonly stickerService;
    private readonly spotService;
    constructor(stickerService: StickerService, spotService: SpotService);
    createSticker(createStickerInput: CreateStickerInput): Promise<Sticker>;
    updateSticker(updateStickerInput: UpdateStickerInput): Promise<Sticker>;
    findAll(): Promise<Sticker[]>;
    findOne(id: Types.ObjectId): Promise<Sticker>;
    spot(sticker: StickerDocument, populate: boolean): Promise<Types.ObjectId | Spot>;
}
