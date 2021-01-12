import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Place, PlaceSchema } from "./place.model";
import { ConfigModule } from "../config/config.module";
import { SearchService } from "./kakaoMapSearch/search.service";
import { PlaceResolver } from "./place.resolver";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }]),
  ],
  providers: [SearchService, PlaceResolver],
})
export class PlaceModule {}
