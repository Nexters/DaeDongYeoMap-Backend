import { Injectable } from "@nestjs/common";
import Axios, { AxiosResponse } from "axios";

import { ConfigService } from "../../config/config.service";

@Injectable()
export class PlaceService {
  constructor(private readonly configService: ConfigService) {}

  // https://developers.naver.com/docs/search/local/
  async findAll(
    query: string,
    display: number = 5,
    sort: string = "random" // 정렬 옵션: random(유사도순), comment(카페/블로그 리뷰 개수 순)
  ): Promise<AxiosResponse<object>> {
    const baseUrl = `${this.configService.get(
      "NAVER_SEARCH_HOST"
    )}/${this.configService.get("NAVER_SEARCH_FORMAT")}`;

    return Axios.get(baseUrl, {
      headers: {
        "X-Naver-Client-Id": this.configService.get("NAVER_SEARCH_CLIENT_ID"),
        "X-Naver-Client-Secret": this.configService.get(
          "NAVER_SEARCH_CLIENT_SECRET"
        ),
      },
      params: {
        query,
        display,
        sort,
      },
    });
  }
}
