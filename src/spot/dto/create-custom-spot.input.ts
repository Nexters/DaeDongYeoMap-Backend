import { InputType, Float, Field } from "@nestjs/graphql";

@InputType({
  description:
    "커스텀 스팟 생성 input입니다. 테마는 category_group_name로 넣어주세요",
})
export class CreateCustomSpotInput {
  @Field(() => String, { nullable: false })
  place_name!: string;

  @Field((type) => Float, { nullable: false })
  x!: number;

  @Field((type) => Float, { nullable: false })
  y!: number;

  @Field(() => String, {
    description: "커스텀 스팟의 테마입니다. (ex. 음식점, 공원)",
    nullable: false,
  })
  category_group_name!: string;

  @Field((type) => Boolean, {
    description: "커스텀 스팟 여부 지정, default true입니다.",
    defaultValue: true,
    nullable: true,
  })
  is_custom?: boolean;

  @Field((type) => Boolean, {
    description:
      "커스텀 스팟 공개 여부 지정, default false입니다. 공개를 할 경우, 수정할 수 없습니다.",
    defaultValue: false,
    nullable: true,
  })
  is_custom_share?: boolean;
}
