import { IsNotEmpty } from "class-validator";

// https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
export class KeywordSearchDto {
  @IsNotEmpty()
  readonly query: string;

  readonly category_group_code?: string;
  readonly x?: string;
  readonly y?: string;
  readonly radius?: number;
  readonly rect?: string;
  readonly page?: number;
  readonly size?: number;
  readonly sort?: string;
}
