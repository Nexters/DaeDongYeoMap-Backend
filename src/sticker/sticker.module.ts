import { Module, CacheModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StickerService } from "./sticker.service";
import { StickerResolver } from "./sticker.resolver";
import { Sticker, StickerSchema } from "../sticker/entities/sticker.entity";
import { Spot, SpotSchema } from "../spot/entities/spot.entity";
import { ConfigModule } from "../config/config.module";
import { SpotService } from "../spot/spot.service";
import { cacheConfig } from "../place/place.module";
import { SearchService } from "../place/kakaoMapSearch/search.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sticker.name, schema: StickerSchema }]),
    MongooseModule.forFeature([{ name: Spot.name, schema: SpotSchema }]),
    ConfigModule,
    CacheModule.registerAsync(cacheConfig),
  ],
  providers: [StickerResolver, StickerService, SpotService, SearchService],
})
export class StickerModule {}
