import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({
  description: "페이지네이션 정보, ",
})
export class PageInfo {
  @Field(() => Number, { description: "총 문서 수" })
  total_count: number;

  @Field(() => Boolean, {
    description:
      "현재 페이지가 마지막 페이지인지 여부, 값이 false면 page를 증가시켜 다음 페이지를 요청할 수 있음",
  })
  is_end: boolean;

  @Field(() => Number, {
    description: "노출 가능 페이지 수 (1 ~ 45)",
  })
  pageable_count: number;

  @Field(() => Number, { description: "현재 페이지 번호" })
  cur_page: number;
}
