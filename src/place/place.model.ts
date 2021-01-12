import { IsNotEmpty } from "class-validator";
import { Field, Float, ObjectType } from "@nestjs/graphql";

// https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
@ObjectType()
export class Place {
  @Field(() => String)
  id: string;

  @Field(() => String)
  place_name: string;

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

  @Field((type) => Float, { nullable: true })
  x?: number;

  @Field((type) => Float, { nullable: true })
  y?: number;
}
