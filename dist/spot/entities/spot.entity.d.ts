import * as mongoose from "mongoose";
import { Sticker } from "../../sticker/entities/sticker.entity";
export declare class Spot {
    _id: mongoose.Types.ObjectId;
    place_id: string;
    stickers: mongoose.Types.ObjectId[] | Sticker[];
    place_name: string;
    category_name?: string;
    category_group_code?: string;
    category_group_name?: string;
    phone?: string;
    address_name?: string;
    road_address_name?: string;
    place_url?: string;
    distance?: string;
    location: string;
    x?: number;
    y?: number;
}
export declare type SpotDocument = Spot & mongoose.Document;
export declare const SpotSchema: mongoose.Schema<any>;
