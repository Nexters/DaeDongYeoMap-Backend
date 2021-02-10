import * as mongoose from "mongoose";
import { Spot } from "../../spot/entities/spot.entity";
export declare class Sticker {
    _id: mongoose.Types.ObjectId;
    sticker_category: string;
    is_used?: boolean;
    spot: mongoose.Types.ObjectId | Spot;
}
export declare type StickerDocument = Sticker & mongoose.Document;
export declare const StickerSchema: mongoose.Schema<any>;
