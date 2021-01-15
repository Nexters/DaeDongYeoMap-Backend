import { InputType, Int, Float, Field } from "@nestjs/graphql";

@InputType()
export class CreateSpotInput {
  @Field(() => String, { description: "카카오 Place id" })
  id: string;

  @Field(() => String)
  place_name: string;

  @Field((type) => Float)
  x: number;

  @Field((type) => Float)
  y: number;

  @Field(() => String, { nullable: true })
  category_name?: string;

  @Field(() => String, { nullable: true })
  category_group_code?: string;

  @Field(() => String, { nullable: true })
  category_group_name?: number;

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
