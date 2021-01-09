import { HttpModule, HttpService, Module, OnModuleInit } from "@nestjs/common";
import { PlaceService } from "./place.service";
import { PlaceController } from "./place.controller";

@Module({
  imports: [
    HttpModule.register({
      baseURL: `${process.env.NAVER_SEARCH_HOST}/${process.env.NAVER_SEARCH_FORMAT}`,
      headers: {
        "X-Naver-Client-Id": `${process.env.NAVER_SEARCH_CLIENT_ID}`,
        "X-Naver-Client-Secret": `${process.env.NAVER_SEARCH_CLIENT_SECRET}`,
      },
    }),
  ],
  providers: [PlaceService],
  controllers: [PlaceController],
})
export class PlaceModule implements OnModuleInit {
  constructor(private httpService: HttpService) {}

  public onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use((req) => {
      console.log("request", req);

      return req;
    });

    this.httpService.axiosRef.interceptors.response.use((response) => {
      console.log("response", response);

      return response;
    });
  }
}
