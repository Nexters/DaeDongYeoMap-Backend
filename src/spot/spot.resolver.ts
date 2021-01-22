import { Resolver, Query, Mutation, Args, Int, Float } from "@nestjs/graphql";
import { SpotService } from "src/spot/spot.service";
import { Spot } from "src/spot/entities/spot.entity";
import { CreateSpotInput } from "src/spot/dto/create-spot.input";
import { UpdateSpotInput } from "src/spot/dto/update-spot.input";
import { DeleteSpotDto } from "src/spot/dto/delete.spot.dto";

@Resolver(() => Spot)
export class SpotResolver {
  constructor(private readonly spotService: SpotService) {}

  @Mutation(() => Spot, {
    description:
      "스팟을 생성/업데이트합니다.\n기존에 누군가에 의해서 만들어졌다면 update됩니다.",
  })
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

  @Query(() => [Spot], {
    description: "(For Debugging) mongoDB에 저장된 모든 스팟 반환",
  })
  async getAllSpots(): Promise<Spot[]> {
    return await this.spotService.findAll();
  }

  // @Mutation(() => Spot)
  // async updateSpot(@Args("updateSpotInput") updateSpotInput: UpdateSpotInput) {
  //   return this.spotService.update(updateSpotInput.id, updateSpotInput);
  // }

  @Mutation(() => DeleteSpotDto, {
    description: "(For Debugging) 스팟 하나 삭제",
  })
  async removeSpot(@Args("id", { type: () => String }) id: string) {
    return await this.spotService.remove(id);
  }

  @Mutation(() => DeleteSpotDto, {
    description: "(For Debugging) 스팟 모두 삭제",
  })
  async removeAllSpots(): Promise<void> {
    await this.spotService.removeAll();
  }

  @Query(() => [Spot], { description: "검색 키워드와 매칭되는 스팟들을 반환" })
  async getSpotsByKeyword(@Args("keyword") keyword: string): Promise<Spot[]> {
    return await this.spotService.getByKeyword(keyword);
  }

  // @Query(() => Spot, { name: "spot" })
  // async findOne(@Args("id", { type: () => Int }) id: number) {
  //   return this.spotService.findOne(id);
  // }
}
