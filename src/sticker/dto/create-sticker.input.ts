import { InputType, Int, Field, PartialType } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { CreateSpotInput } from "src/spot/dto/create-spot.input";
import { Spot } from "src/spot/entities/spot.entity";

@InputType()
export class CreateStickerInput extends PartialType(CreateSpotInput) {
  // @Field(() => User, {
  //   description: "스티커를 생성한 User",
  // })
  // owner: mongoose.Types.ObjectId;

  // @Field(() => [User], {
  //   description: "스티커를 생성한 User와 함께한 파트너들(User 리스트)",
  // })
  // partners: mongoose.Types.ObjectId[];

  // @TODO: 추후 enum으로 변경
  @Field(() => String, {
    description: "Sticker category로 스티커 이름정도 주면 적당할 듯",
  })
  category: string;

  @Field(() => Boolean, { description: "Sticker가 코스 생성에 사용여부" })
  isUsed: boolean;

  @Field(() => Spot, {
    description: "스티커가 붙여진 Spot id",
  })
  spotId?: mongoose.Types.ObjectId;
}
