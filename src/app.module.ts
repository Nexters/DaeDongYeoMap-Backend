import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmojiModule } from "./emoji/emoji.module";
import { CommentModule } from "./comment/comment.module";
import { SpotModule } from "./spot/spot.module";
import { PlaceModule } from "./place/place.module";
import { UserModule } from "./user/user.module";
// import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    EmojiModule,
    CommentModule,
    SpotModule,
    PlaceModule,
    UserModule,
    // GraphQLModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.dev",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
