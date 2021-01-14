import { CreateSpotInput } from "./create-spot.input";
import { InputType, Field, Int, Float, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateSpotInput extends PartialType(CreateSpotInput) {
  @Field(() => String, { nullable: true })
  place_name?: string;

  @Field((type) => Float, { nullable: true })
  x?: number;

  @Field((type) => Float, { nullable: true })
  y?: number;
}
