import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";

import { SearchService } from "./kakaoMap/search.service";
import { PlaceController } from "./place.controller";

@Module({
  imports: [ConfigModule],
  controllers: [PlaceController],
  providers: [SearchService],
})
export class PlaceModule {}
