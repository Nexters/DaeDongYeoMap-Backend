import { HttpModule, Module } from "@nestjs/common";
import { PlaceService } from "./place.service";
import { PlaceController } from './place.controller';

@Module({
  imports: [
    HttpModule.register({
      baseURL: `${process.env.NAVER_SEARCH_HOST}/${process.env.NAVER_SEARCH_FORMAT}`,
      params: {
        NAVER_SEARCH_CLIENT_ID: process.env.NAVER_SEARCH_CLIENT_ID,
        NAVER_SEARCH_CLIENT_SECRET: process.env.NAVER_SEARCH_CLIENT_SECRET,
      },
    }),
  ],
  providers: [PlaceService],
  controllers: [PlaceController],
})
export class PlaceModule {}
