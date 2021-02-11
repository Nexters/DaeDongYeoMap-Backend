import { Module } from "@nestjs/common";
import * as path from "path";

import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { AppConfigModule } from "./config/config.module";
import { AppConfigService } from "./config/config.service";
import { PlaceModule } from "./place/place.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SpotModule } from "./spot/spot.module";
import { UserModule } from "./user/user.module";
import { CourseModule } from "./course/course.module";
import { StickerModule } from "./sticker/sticker.module";

@Module({
  imports: [
    AppConfigModule,
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(process.cwd(), "src/schema.gql"),
      debug: false,
      playground: true,
    }),
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (cfs: AppConfigService) => {
        return {
          uri: await cfs.getDB(),
        };
      },
      inject: [AppConfigService],
    }),
    PlaceModule,
    SpotModule,
    StickerModule,
    CourseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
