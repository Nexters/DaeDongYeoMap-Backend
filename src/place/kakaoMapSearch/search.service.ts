import Axios from "axios";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateSpotInput } from "../../spot/dto/create-spot.input";
import { KeywordSearchDto } from "./search.dto";
import { PaginatedPlace, Place } from "../place.entity";
import { PageInfo } from "../../shared/entities/pageinfo.entity";
import { SortType } from "../../place/kakaoMapSearch/search.dto";

@Injectable()
export class SearchService {
  constructor(private configService: ConfigService) {}

  // https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
  async searchByKeyword(
    keywordSearchDto: KeywordSearchDto
  ): Promise<PaginatedPlace> {
    const baseUrl = this.configService.get("app.KAKAO_DEV_HOST");

    const response: { meta: PageInfo; documents: Place[] } = await Axios.get(
      baseUrl,
      {
        headers: {
          Authorization: `KakaoAK ${this.configService.get(
            "app.KAKAO_DEV_REST_API_KEY"
          )}`,
        },
        params: {
          ...keywordSearchDto,
        },
      }
    )
      .then((response) => response.data)
      .catch((err) => {
        if (err.response.status == 400) {
          throw new HttpException("no matched place", HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(
            "kakao api server error",
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
      });

    const paginatedPlace: PaginatedPlace = {
      pageInfo: {
        cur_page: keywordSearchDto.page,
        ...response.meta,
      },
      places: response.documents,
    };

    return paginatedPlace;
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
      .then(({ places }) => (places.length >= 1 ? places[0] : null))
      .catch((error) => {
        throw new HttpException(
          `cannot get identical place cause of ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }
}
