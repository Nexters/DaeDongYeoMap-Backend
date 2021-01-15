import { IsNotEmpty } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Emoji {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  spot_id?: string;

  @Field(() => String, { nullable: true })
  user_id?: string;
}
