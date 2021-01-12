import { Model, Types } from "mongoose";
import Axios, { AxiosResponse } from "axios";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { ConfigService } from "../../config/config.service";
import { Place, PlaceDocument } from "../place.model";
import { KeywordSearchDto } from "./search.dto";

@Injectable()
export class SearchService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>
  ) {}

  // https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
  async searchByKeyworld(
    keywordSearchDto: KeywordSearchDto
  ): Promise<AxiosResponse<Place[]>> {
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

  async cachePlaces(
    place: AxiosResponse<Place>,
    dueHour: Number
  ):  {
    if (mongoRes && mongoRes.expirationDate.getTime() > new Date().getTime()) {
      return places;
    }
  }
}
