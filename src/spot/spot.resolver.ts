import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { SpotService } from "src/spot/spot.service";
import { Spot } from "src/spot/entities/spot.entity";
import { CreateSpotInput } from "src/spot/dto/create-spot.input";
import { UpdateSpotInput } from "src/spot/dto/update-spot.input";

@Resolver(() => Spot)
export class SpotResolver {
  constructor(private readonly spotService: SpotService) {}

  @Mutation(() => Spot)
  async createSpot(@Args("createSpotInput") createSpotInput: CreateSpotInput) {
    const spot = await this.spotService.findOne(createSpotInput.id);

    if (spot === null) {
      return this.spotService.create(createSpotInput);
    } else {
      return this.spotService.update(spot, createSpotInput.emoji);
    }
  }

  @Query(() => [Spot])
  async findSpots() {
    return await this.spotService.findAll();
  }

  // @Query(() => Spot, { name: "spot" })
  // async findOne(@Args("id", { type: () => Int }) id: number) {
  //   return this.spotService.findOne(id);
  // }

  // @Mutation(() => Spot)
  // async updateSpot(@Args("updateSpotInput") updateSpotInput: UpdateSpotInput) {
  //   return this.spotService.update(updateSpotInput.id, updateSpotInput);
  // }

  // @Mutation(() => Spot)
  // async removeSpot(@Args("id", { type: () => Int }) id: number) {
  //   return this.spotService.remove(id);
  // }
}
