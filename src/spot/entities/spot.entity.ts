import { ObjectType, Field, ID, Int, Float } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema({ timestamps: true }) // graphql 은 timestamp 삽입 어떻게 할까?
export class Spot {
  @Field(() => String, { description: "kakao place id" })
  @Prop({ required: true, unique: true })
  id: string;

  @Field((type) => [String], { description: "list of emoji ids" })
  @Prop({ required: true })
  emojis: string[];

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
}

export type SpotDocument = Spot & mongoose.Document;
export const SpotSchema = SchemaFactory.createForClass(Spot);
