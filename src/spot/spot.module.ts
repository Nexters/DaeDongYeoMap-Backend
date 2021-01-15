import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Spot, SpotSchema } from "src/spot/entities/spot.entity";

import { SpotService } from "src/spot/spot.service";
import { SpotResolver } from "src/spot/spot.resolver";

import { ConfigModule } from "src/config/config.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Spot.name, schema: SpotSchema }]),
    ConfigModule,
  ],
  providers: [SpotResolver, SpotService],
})
export class SpotModule {}
