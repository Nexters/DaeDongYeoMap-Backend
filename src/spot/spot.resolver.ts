import { Resolver, Query, Mutation, Args, Int, Float } from "@nestjs/graphql";
import { SpotService } from "src/spot/spot.service";
import { Spot } from "src/spot/entities/spot.entity";
import { CreateSpotInput } from "src/spot/dto/create-spot.input";
import { UpdateSpotInput } from "src/spot/dto/update-spot.input";
import { DeleteSpotDto } from "src/spot/dto/delete.spot.dto";

@Resolver(() => Spot)
export class SpotResolver {
  constructor(private readonly spotService: SpotService) {}

  @Mutation(() => Spot)
  async createSpot(
    @Args("createSpotInput") createSpotInput: CreateSpotInput
  ): Promise<Spot> {
    const spot = await this.spotService.findOne(createSpotInput.id);

    if (spot === null) {
      return await this.spotService.create(createSpotInput);
    } else {
      return await this.spotService.update(spot, createSpotInput.emoji);
    }
  }

  @Query(() => [Spot])
  async getAllSpots(): Promise<Spot[]> {
    return await this.spotService.findAll();
  }

  // @Mutation(() => Spot)
  // async updateSpot(@Args("updateSpotInput") updateSpotInput: UpdateSpotInput) {
  //   return this.spotService.update(updateSpotInput.id, updateSpotInput);
  // }

  @Mutation(() => DeleteSpotDto)
  async removeSpot(@Args("id", { type: () => String }) id: string) {
    return await this.spotService.remove(id);
  }

  @Mutation(() => DeleteSpotDto)
  async removeAllSpots(): Promise<void> {
    await this.spotService.removeAll();
  }

  @Query(() => [Spot])
  async getSpotsByKeyword(@Args("keyword") keyword: string): Promise<Spot[]> {
    return await this.spotService.getByKeyword(keyword);
  }

  // @Query(() => Spot, { name: "spot" })
  // async findOne(@Args("id", { type: () => Int }) id: number) {
  //   return this.spotService.findOne(id);
  // }
}
