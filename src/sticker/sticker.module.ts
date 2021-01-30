import { Module, CacheModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StickerService } from "./sticker.service";
import { StickerResolver } from "./sticker.resolver";
import { Sticker, StickerSchema } from "src/sticker/entities/sticker.entity";
import { Spot, SpotSchema } from "src/spot/entities/spot.entity";
import { ConfigModule } from "src/config/config.module";
import { SpotService } from "src/spot/spot.service";
import { cacheConfig } from "src/place/place.module";
import { SearchService } from "src/place/kakaoMapSearch/search.service";

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
