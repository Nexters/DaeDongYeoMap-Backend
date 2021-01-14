import Axios, { AxiosResponse } from "axios";
import { Injectable, Inject, CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";

import { ConfigService } from "../../config/config.service";
import { KeywordSearchDto } from "./search.dto";

@Injectable()
export class SearchService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  // https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
  async searchByKeyworld(
    keywordSearchDto: KeywordSearchDto
  ): Promise<void | AxiosResponse<object>> {
    const baseUrl = this.configService.get("KAKAO_DEV_HOST");
    return Axios.get(baseUrl, {
      headers: {
        Authorization: `KakaoAK ${this.configService.get(
          "KAKAO_DEV_REST_API_KEY"
        )}`,
      },
      params: {
        ...keywordSearchDto,
      },
    })
      .then((response) => response.data.documents)
      .catch((err) => console.error(err));
  }

  async setPlaceFromCacheById(key, value) {
    return this.cacheManager.set(key, value);
  }

  async getPlaceFromCacheById(key) {
    return this.cacheManager.get(key);
  }
}
