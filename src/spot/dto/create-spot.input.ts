import { InputType, Int, Float, Field } from "@nestjs/graphql";

@InputType({ description: "스팟 생성" })
export class CreateSpotInput {
  @Field(() => String, { description: "카카오 Place id", nullable: false })
  place_id!: string;

  @Field(() => String, { nullable: false })
  place_name!: string;

  @Field((type) => Float, { nullable: false })
  x!: number;

  @Field((type) => Float, { nullable: false })
  y!: number;

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
}
