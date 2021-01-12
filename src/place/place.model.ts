import { Field, Float, ObjectType } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
@ObjectType()
@Schema()
export class Place {
  // @Prop({ required: true })
  @Field(() => String)
  @Prop({ required: true, unique: true })
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  place_name: string;

  @Field(() => String, { nullable: true })
  @Prop()
  category_name?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  category_group_code?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  category_group_name?: number;

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

  @Field((type) => Float, { nullable: true })
  @Prop()
  x?: number;

  @Field((type) => Float, { nullable: true })
  @Prop()
  y?: number;

  @Prop({ required: true, type: Date })
  expirationDate: Date;
}

// for cache
export type PlaceDocument = Place & mongoose.Document;
export const PlaceSchema = SchemaFactory.createForClass(Place);
