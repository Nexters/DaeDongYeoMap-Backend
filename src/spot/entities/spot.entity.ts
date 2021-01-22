import { ObjectType, Field, ID, Int, Float } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema({ timestamps: true }) // graphql 은 timestamp 삽입 어떻게 할까?
export class Spot {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Spot" })
  @Field(() => ID, { description: "mongodb default id" })
  _id: Spot;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: "kakao place id" })
  id: string;

  @Prop({ required: true })
  @Field((type) => [String], { description: "list of emoji ids" })
  emojis: string[];

  @Prop({ required: true })
  @Field(() => String)
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

  @Field(() => String)
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
}

export type SpotDocument = Spot & mongoose.Document;
export const SpotSchema = SchemaFactory.createForClass(Spot);
