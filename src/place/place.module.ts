import { Module } from "@nestjs/common";

import { SharedModule } from "../shared/shared.module";
import { SearchService } from "./kakaoMapSearch/search.service";
import { PlaceResolver } from "./place.resolver";

@Module({
  imports: [SharedModule],
  providers: [SearchService, PlaceResolver],
  exports: [SearchService],
})
export class PlaceModule {}
