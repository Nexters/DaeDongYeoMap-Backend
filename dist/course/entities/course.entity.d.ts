import * as mongoose from "mongoose";
export declare class Course {
    _id: mongoose.Types.ObjectId;
    stickers: mongoose.Types.ObjectId[];
    title: string;
    is_share: boolean;
    courseImage: String;
}
export declare type CourseDocument = Course & mongoose.Document;
export declare const CourseSchema: mongoose.Schema<any>;
