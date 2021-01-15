import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { SpotService } from "./spot.service";
import { Spot } from "./entities/spot.entity";
import { CreateSpotInput } from "./dto/create-spot.input";
import { UpdateSpotInput } from "./dto/update-spot.input";

@Resolver(() => Spot)
export class SpotResolver {
  constructor(private readonly spotService: SpotService) {}

  @Mutation(() => Spot)
  async createSpot(@Args("createSpotInput") createSpotInput: CreateSpotInput) {
    return await this.spotService.create(createSpotInput);
  }

  @Query(() => [Spot], { name: "spot" })
  async findAll() {
    return this.spotService.findAll();
  }

  @Query(() => Spot, { name: "spot" })
  async findOne(@Args("id", { type: () => Int }) id: number) {
    return this.spotService.findOne(id);
  }

  @Mutation(() => Spot)
  async updateSpot(@Args("updateSpotInput") updateSpotInput: UpdateSpotInput) {
    return this.spotService.update(updateSpotInput.id, updateSpotInput);
  }

  @Mutation(() => Spot)
  async removeSpot(@Args("id", { type: () => Int }) id: number) {
    return this.spotService.remove(id);
  }
}
