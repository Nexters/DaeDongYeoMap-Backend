import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { PlaceModule } from "../place/place.module";
import { StickerService } from "./sticker.service";
import { StickerResolver } from "./sticker.resolver";
import { Sticker, StickerSchema } from "../sticker/entities/sticker.entity";
import { Spot, SpotSchema } from "../spot/entities/spot.entity";
import { SpotService } from "../spot/spot.service";

@Module({
  imports: [
    PlaceModule,
    MongooseModule.forFeature([{ name: Sticker.name, schema: StickerSchema }]),
    MongooseModule.forFeature([{ name: Spot.name, schema: SpotSchema }]),
  ],
  providers: [StickerResolver, StickerService, SpotService],
})
export class StickerModule {}
