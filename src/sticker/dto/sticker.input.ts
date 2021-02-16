import { InputType, Field, IntersectionType } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Min, Max, IsInt, IsIn } from "class-validator";
import { CreateSpotInput } from "../../spot/dto/create-spot.input";

@InputType()
export class StickerInput {
  // @Field(() => String, {
  //   description: "스티커를 생성한 User",
  // })
  // owner: mongoose.Types.ObjectId;

  // @Field(() => [String], {
  //   description: "스티커를 생성한 User와 함께한 파트너들(User 리스트)",
  // })
  // partners: mongoose.Types.ObjectId[];

  @Field(() => Number, {
    description: "스티커 번호, 0~11",
  })
  @Min(0, {
    message: "index는 0부터 시작합니다.",
  })
  @Max(11, {
    message: "index는 11이 max입니다.",
  })
  @IsInt()
  sticker_index: number;

  @Field(() => Number, {
    description: "스티커 당도 퍼센트",
  })
  @IsIn([0, 30, 50, 70, 100], {
    message: "퍼센트는 0 30 50 70 100 중에서 선택해야 합니다.",
  })
  sweet_percent: number;

  @Field(() => Boolean, {
    description: "Sticker가 코스 생성에 사용여부",
    nullable: true,
  })
  is_used?: boolean;
}

@InputType()
export class CreateStickerInput extends IntersectionType(
  CreateSpotInput,
  StickerInput
) {}

@InputType()
export class UpdateStickerInput {
  @Field(() => String, { description: "Sticker id" })
  _id: mongoose.Types.ObjectId;

  @Field(() => Boolean, {
    description: "Sticker가 코스 생성에 사용여부",
    nullable: true,
  })
  is_used: boolean;
}
