import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";

import { GraphQLModule } from "@nestjs/graphql";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmojiModule } from "./emoji/emoji.module";
import { CommentModule } from "./comment/comment.module";
import { SpotModule } from "./spot/spot.module";
import { PlaceModule } from "./place/place.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule,
    EmojiModule,
    CommentModule,
    SpotModule,
    PlaceModule,
    UserModule,
    // GraphQLModule.forRoot({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
