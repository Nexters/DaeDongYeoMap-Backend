import { Module } from "@nestjs/common";
import * as path from "path";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaceModule } from "./place/place.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SpotModule } from "./spot/spot.module";
import { UserModule } from "./user/user.module";
import { CourseModule } from "./course/course.module";
import { StickerModule } from "./sticker/sticker.module";

const ENV = process.env.NODE_ENV;

const configModuleOptions =
  ENV === "prod"
    ? { isGlobal: true, ignoreEnvFile: true }
    : { isGlobal: true, envFilePath: "./env/.env.dev" };

async function getDB(cfs: ConfigService): Promise<string> {
  let uri;
  if (cfs.get("NODE_ENV") === "dev") {
    uri = `mongodb://localhost:27017/mongo`;
  }
  uri = `mongodb://${cfs.get("MONGO_USER")}:${cfs.get("MONGO_PWD")}@${cfs.get(
    "MONGO_IP"
  )}:${cfs.get("MONGO_PORT")}/${cfs.get("MONGO_DB_NAME")}`;

  return await uri;
}

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(process.cwd(), "src/schema.gql"),
      debug: false,
      playground: true,
    }),
    // MongooseModule.forRoot(awaitgetDB(ConfigService)),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfs: ConfigService) => ({
        uri: "mongodb://localhost:27017/mongo",
      }),
      inject: [ConfigService],
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
