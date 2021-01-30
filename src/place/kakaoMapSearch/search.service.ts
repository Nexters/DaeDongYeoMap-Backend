import Axios, { AxiosResponse } from "axios";
import {
  Injectable,
  Inject,
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Cache } from "cache-manager";

import { CreateSpotInput } from "src/spot/dto/create-spot.input";
import { ConfigService } from "../../config/config.service";
import { KeywordSearchDto } from "./search.dto";
import { Place } from "../place.entity";
import { SortType } from "src/place/kakaoMapSearch/search.dto";

@Injectable()
export class SearchService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  // https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
  async searchByKeyword(keywordSearchDto: KeywordSearchDto): Promise<Place[]> {
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
      .catch((err) => {
        if (err.response.status == 400) {
          console.error(err.response);
          throw new HttpException("no matched place", HttpStatus.BAD_REQUEST);
        } else {
          console.error(err.response);
          throw new HttpException(
            "kakao api server error",
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
      });
  }

  // https://github.com/BryanDonovan/node-cache-manager
  async setPlaceFromCacheById(key, value) {
    this.cacheManager
      .set(key, value, { ttl: 300 })
      .then()
      .catch((err) => {
        console.error(err);
        throw new HttpException(
          "set place cache error",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }

  async getPlaceFromCacheById(id): Promise<Place> {
    return this.cacheManager
      .get(id)
      .then()
      .catch((error) => {
        console.error(error);
        throw new HttpException(
          `cannot get place from cache cause of ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }

  async getIdenticalPlace(
    createSpotInput: CreateSpotInput
  ): Promise<Place | null> {
    return this.searchByKeyword({
      query: createSpotInput.place_name,
      x: createSpotInput.x,
      y: createSpotInput.y,
      radius: 1,
      sort: SortType.distance,
    })
      .then((places) => (places.length >= 1 ? places[0] : null))
      .catch((error) => {
        console.error(error);
        throw new HttpException(
          `cannot get identical place cause of ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }
}
