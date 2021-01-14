import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema({ timestamps: true }) // graphql 은 timestamp 삽입 어떻게 할까?
export class Spot {
  @Prop({ required: true, unique: true })
  @Field(() => String, { description: "카카오 Place id" })
  _id: string;

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
}

export type SpotDocument = Spot & mongoose.Document;
export const SpotSchema = SchemaFactory.createForClass(Spot);
