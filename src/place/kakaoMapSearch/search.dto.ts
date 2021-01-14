import {
  Field,
  Float,
  InputType,
  Int,
  registerEnumType,
} from "@nestjs/graphql";

enum SortType {
  distance = "distance",
  accuracy = "accuracy",
}

registerEnumType(SortType, {
  name: "SortType",
});

// https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
@InputType()
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

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  size?: number;

  @Field((type) => SortType, { nullable: true })
  sort?: SortType;
}
