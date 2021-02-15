import { InputType, Float, Field, PartialType } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { CreateCustomSpotInput } from "./create-custom-spot.input";

@InputType({
  description:
    "커스텀 스팟 업데이트 input입니다. is_custom_share이 false일 경우에만 동작합니다.",
})
export class UpdateCustomSpotInput extends PartialType(CreateCustomSpotInput) {
  @Field(() => String, { description: "Custom Spot id" })
  _id: mongoose.Types.ObjectId;
}
