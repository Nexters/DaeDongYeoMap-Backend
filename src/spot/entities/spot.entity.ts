import { ObjectType, Field, ID, Int, Float } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Sticker } from "../../sticker/entities/sticker.entity";
import { PageInfo } from "../../shared/entities/pageinfo.entity";

@ObjectType({
  description:
    "Emoji를 포함한 유저데이터를 포함하여, mongodb에 저장시킬 장소 데이터",
})
@Schema({ timestamps: true })
export class Spot {
  @Field(() => String, { description: "Spot id" })
  _id: mongoose.Types.ObjectId;

  @Field(() => String, { description: "kakao place id" })
  @Prop({ required: true, unique: true })
  place_id: string;

  @Field(() => [Sticker], { description: "list of sticker ids" })
  @Prop({ type: [mongoose.Types.ObjectId], ref: "Sticker" })
  stickers: mongoose.Types.ObjectId[] | Sticker[];

  @Field(() => String)
  @Prop({ required: true, text: true }) // {text : true} for indexing
  place_name: string;

  @Field(() => String, { nullable: true })
  @Prop()
  category_name?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  category_group_code?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  category_group_name?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  phone?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  address_name?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  road_address_name?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  place_url?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  distance?: string;

  @Prop({
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
      default: [0, 0],
    },
  })
  location: string;

  @Field((type) => Float, { nullable: true })
  @Prop()
  x?: number;

  @Field((type) => Float, { nullable: true })
  @Prop()
  y?: number;

  @Field((type) => Boolean, { defaultValue: false, nullable: true })
  @Prop()
  is_custom?: boolean;

  @Field((type) => Boolean, { defaultValue: false, nullable: true })
  @Prop()
  is_custom_share?: boolean;
}

@ObjectType({
  description: "페이지네이션 정보를 포함한 spot 정보",
})
export class PaginatedSpot {
  @Field(() => PageInfo, { description: "카카오 장소 페이지네이션 정보" })
  pageInfo: PageInfo;

  @Field(() => [Spot], { description: "카카오 장소 정보들" })
  spots: Spot[];
}

export type SpotDocument = Spot & mongoose.Document;
export const SpotSchema = SchemaFactory.createForClass(Spot);
