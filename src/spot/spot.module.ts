import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaceModule } from "../place/place.module";

import { Spot, SpotSchema } from "src/spot/entities/spot.entity";

import { SpotService } from "src/spot/spot.service";
import { SpotResolver } from "src/spot/spot.resolver";

@Module({
  imports: [
    PlaceModule,
    MongooseModule.forFeature([{ name: Spot.name, schema: SpotSchema }]),
  ],
  providers: [SpotResolver, SpotService],
})
export class SpotModule {}
