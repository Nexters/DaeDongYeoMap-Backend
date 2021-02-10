import * as mongoose from "mongoose";
import { CreateSpotInput } from "src/spot/dto/create-spot.input";
export declare class StickerInput {
    sticker_category: string;
    is_used?: boolean;
}
declare const CreateStickerInput_base: import("@nestjs/common").Type<CreateSpotInput & StickerInput>;
export declare class CreateStickerInput extends CreateStickerInput_base {
}
export declare class UpdateStickerInput {
    _id: mongoose.Types.ObjectId;
    is_used: boolean;
}
export {};
