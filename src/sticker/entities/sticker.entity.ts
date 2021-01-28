import { ObjectType, Field, ID, Int, Float } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Spot } from "src/spot/entities/spot.entity";

@ObjectType({
  description: "'이모지 스티커'로 코스 생성에 기본적으로 사용되는 단위입니다.",
})
@Schema({ timestamps: true })
export class Sticker {
  @Field(() => String, { description: "Sticker id" })
  _id: mongoose.Types.ObjectId;

  // @Field(() => User, {
  //   description: "스티커를 생성한 User",
  // })
  // @Prop({ type: mongoose.Types.ObjectId, ref: User })
  // owner: mongoose.Types.ObjectId;

  // @Field(() => [User], {
  //   description: "스티커를 생성한 User와 함께한 파트너들(User 리스트)",
  // })
  // @Prop({ type: mongoose.Types.ObjectId, ref: User })
  // partners: mongoose.Types.ObjectId[];

  // @TODO: 추후 enum으로 변경
  @Field(() => String, {
    description: "Sticker category로 스티커 이름정도 주면 적당할 듯",
  })
  @Prop({ required: true })
  category: string;

  @Field(() => Boolean, { description: "Sticker가 코스 생성에 사용여부" })
  @Prop({ default: false })
  isUsed: boolean;

  @Field(() => Spot, {
    description: "스티커가 붙여진 Spot id",
  })
  @Prop({ type: mongoose.Types.ObjectId, ref: Spot })
  spotId: mongoose.Types.ObjectId;
}

export type SpotDocument = Spot & mongoose.Document;
export const SpotSchema = SchemaFactory.createForClass(Spot);
