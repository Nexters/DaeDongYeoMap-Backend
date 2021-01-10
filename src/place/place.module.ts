import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";

import { PlaceService } from "./kakaoMap/search.service";
import { PlaceController } from "./place.controller";

@Module({
  imports: [ConfigModule],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
