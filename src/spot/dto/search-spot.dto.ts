import { InputType, Int, Float, Field } from "@nestjs/graphql";

@InputType({
  description:
    "스팟 검색으로, 해당 필드가 비워져 있을 경우 db에 저장된 모든 스팟을 반환합니다.",
})
export class SearchSpotDto {
  @Field(() => String, { nullable: true })
  keyword?: string;

  @Field(() => Float, { nullable: true })
  x?: number;

  @Field(() => Float, { nullable: true })
  y?: number;

  @Field(() => Int, {
    description:
      "단위 meter, 0~20000 사이의 값으로 중심 좌표부터의 반경거리. 특정 지역을 중심으로 검색하려고 할 경우 중심좌표로 쓰일 x,y와 함께 사용.",
    nullable: true,
    defaultValue: 1000,
  })
  radius?: number;
}
