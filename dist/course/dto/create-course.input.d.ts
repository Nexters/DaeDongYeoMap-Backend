import * as mongoose from "mongoose";
export declare class CreateCourseInput {
    stickers: mongoose.Types.ObjectId[];
    title: string;
    is_share: boolean;
}
