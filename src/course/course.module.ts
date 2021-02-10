import { Module } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CourseImageService } from "./courseImage.service";
import { CourseResolver } from "./course.resolver";
import { MongooseModule } from "@nestjs/mongoose";

import { PlaceModule } from "../place/place.module";

import { Course, CourseSchema } from "./entities/course.entity";
import { Sticker, StickerSchema } from "../sticker/entities/sticker.entity";
import { StickerService } from "../sticker/sticker.service";
import { SpotService } from "../spot/spot.service";
import { Spot, SpotSchema } from "../spot/entities/spot.entity";

@Module({
  imports: [
    PlaceModule,
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: Sticker.name, schema: StickerSchema }]),
    MongooseModule.forFeature([{ name: Spot.name, schema: SpotSchema }]),
  ],
  providers: [
    CourseResolver,
    CourseService,
    CourseImageService,
    StickerService,
    SpotService,
  ],
})
export class CourseModule {}
