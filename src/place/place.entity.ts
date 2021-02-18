import { Field, ObjectType, Float } from "@nestjs/graphql";
import { PageInfo } from "../shared/entities/pageinfo.entity";

// https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
@ObjectType({
  description: "카카오 지도 api로 부터 받은 위치 정보",
})
export class Place {
  @Field(() => String, { description: "kakao place id" })
  id: string;

  @Field(() => String)
  place_name: string;

  @Field(() => String, { nullable: true })
  category_name?: string;

  @Field(() => String, { nullable: true })
  category_group_code?: string;

  @Field(() => String, { nullable: true })
  category_group_name?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  address_name?: string;

  @Field(() => String, { nullable: true })
  road_address_name?: string;

  @Field(() => String, { nullable: true })
  place_url?: string;

  @Field(() => String, { nullable: true })
  distance?: string;

  @Field((type) => Float, { nullable: true })
  x?: number;

  @Field((type) => Float, { nullable: true })
  y?: number;
}

@ObjectType({
  description: "페이지네이션 정보를 포함한 place 정보",
})
export class PaginatedPlace {
  @Field(() => PageInfo, { description: "카카오 장소 페이지네이션 정보" })
  pageInfo: PageInfo;

  @Field(() => [Place], { description: "카카오 장소 정보들" })
  places: Place[];
}
