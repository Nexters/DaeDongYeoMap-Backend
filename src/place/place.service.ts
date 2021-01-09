import { Injectable, HttpService } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";

@Injectable()
export class PlaceService {
  constructor(private readonly httpService: HttpService) {}

  // https://developers.naver.com/docs/search/local/
  findAll(
    query: string,
    display: number = 5,
    sort: string = "random" // 정렬 옵션: random(유사도순), comment(카페/블로그 리뷰 개수 순)
  ): Observable<AxiosResponse<object>> {
    return this.httpService.get(
      `?query=${query}&display=${display}&sort=${sort}`
    );
  }
}
