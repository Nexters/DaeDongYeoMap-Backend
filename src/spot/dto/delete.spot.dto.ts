import { ObjectType, Int, Float, Field } from "@nestjs/graphql";

@ObjectType()
export class DeleteSpotDto {
  @Field((type) => Int)
  ok: number;

  @Field((type) => Int)
  n: number;

  @Field((type) => Int)
  deletedCount: number;
}
