import {
  Field,
  Float,
  InputType,
  Int,
  registerEnumType,
} from "@nestjs/graphql";

export enum SortType {
  distance = "distance",
  accuracy = "accuracy",
}

registerEnumType(SortType, {
  name: "SortType",
});

// https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
@InputType({
  description:
    "SortType은 정확도(accuracy)가 기본이며, 거리순(distance) 정렬을 원할 경우 x,y는 필수 입니다.",
})
export class KeywordSearchDto {
  @Field(() => String)
  query: string;

  @Field(() => String, { nullable: true })
  category_group_code?: string;

  @Field(() => Float, { nullable: true })
  x?: number;

  @Field(() => Float, { nullable: true })
  y?: number;

  @Field(() => Int, { nullable: true })
  radius?: number;

  @Field(() => String, { nullable: true })
  rect?: string;

  @Field(() => Int, {
    description: "결과 페이지 번호, 1~45 사이의 값",
    nullable: true,
    defaultValue: 1,
  })
  page?: number;

  @Field(() => Int, {
    description: "한 페이지에 보여질 문서의 개수, 1~15 사이의 값",
    nullable: true,
    defaultValue: 15,
  })
  size?: number;

  @Field((type) => SortType, { nullable: true })
  sort?: SortType;
}
