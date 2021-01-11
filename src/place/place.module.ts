import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";

import { SearchService } from "./kakaoMap/search.service";
import { PlaceResolver } from "./place.resolver";

@Module({
  imports: [ConfigModule],
  providers: [SearchService, PlaceResolver],
})
export class PlaceModule {}
