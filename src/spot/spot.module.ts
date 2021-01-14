import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Spot, SpotSchema } from "./entities/spot.entity";
import { SpotService } from "./spot.service";
import { SpotResolver } from "./spot.resolver";

import { ConfigModule } from "src/config/config.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Spot.name, schema: SpotSchema }]),
    ConfigModule,
  ],
  providers: [SpotResolver, SpotService],
})
export class SpotModule {}
