import { Module, CacheModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Spot, SpotSchema } from "src/spot/entities/spot.entity";
import { cacheConfig } from "src/place/place.module";
import { SearchService } from "src/place/kakaoMapSearch/search.service";

import { SpotService } from "src/spot/spot.service";
import { SpotResolver } from "src/spot/spot.resolver";
import { ConfigModule } from "src/config/config.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Spot.name, schema: SpotSchema }]),
    ConfigModule,
    CacheModule.registerAsync(cacheConfig),
  ],
  providers: [SpotResolver, SpotService, SearchService],
})
export class SpotModule {}
