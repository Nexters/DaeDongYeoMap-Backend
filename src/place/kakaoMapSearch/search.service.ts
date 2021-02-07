import Axios from "axios";
import {
  Injectable,
  Inject,
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Cache } from "cache-manager";
import { ConfigService } from "@nestjs/config";
import { CreateSpotInput } from "../../spot/dto/create-spot.input";
import { KeywordSearchDto } from "./search.dto";
import { Place } from "../place.entity";
import { SortType } from "../../place/kakaoMapSearch/search.dto";

@Injectable()
export class SearchService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private configService: ConfigService
  ) {}

  // https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
  async searchByKeyword(keywordSearchDto: KeywordSearchDto): Promise<Place[]> {
    const baseUrl = this.configService.get("app.KAKAO_DEV_HOST");

    return Axios.get(baseUrl, {
      headers: {
        Authorization: `KakaoAK ${this.configService.get(
          "app.KAKAO_DEV_REST_API_KEY"
        )}`,
      },
      params: {
        ...keywordSearchDto,
      },
    })
      .then((response) => response.data.documents)
      .catch((err) => {
        console.log(err);
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
    this.cache
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
    return this.cache
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
