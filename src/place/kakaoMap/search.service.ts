import { Injectable } from "@nestjs/common";
import Axios, { AxiosResponse } from "axios";

import { ConfigService } from "../../config/config.service";
import { KeywordSearchDto } from "./search.dto";

@Injectable()
export class SearchService {
  constructor(private readonly configService: ConfigService) {}

  // https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
  async searchByKeyworld(
    keywordSearchDto: KeywordSearchDto
    //): Promise<AxiosResponse<object>> {
  ): Promise<object> {
    const baseUrl = this.configService.get("KAKAO_DEV_HOST");
    const { documents } = await Axios.get(baseUrl, {
      headers: {
        Authorization: `KakaoAK ${this.configService.get(
          "KAKAO_DEV_REST_API_KEY"
        )}`,
      },
      params: {
        ...keywordSearchDto,
      },
    })
      .then((response) => response.data)
      .catch((err) => console.error(err));

    return documents;
  }
}
