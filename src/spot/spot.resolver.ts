import { HttpException, HttpStatus } from "@nestjs/common";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Float,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { SpotService } from "../spot/spot.service";
import { Spot, SpotDocument } from "../spot/entities/spot.entity";
import { Sticker } from "../sticker/entities/sticker.entity";
import { CreateSpotInput } from "../spot/dto/create-spot.input";
import { UpdateSpotInput } from "../spot/dto/update-spot.input";
import { DeleteSpotDto } from "../spot/dto/delete.spot.dto";

@Resolver(() => Spot)
export class SpotResolver {
  constructor(private readonly spotService: SpotService) {}

  // TODO: mongodb, graphql가 single document, 다중 업데이트 요청 처리 (transaction 어떻게 처리되는가?)
  // @Mutation(() => Spot, {
  //   description:
  //     "스팟을 생성/업데이트합니다.\n이미 기존에 스팟이 생성되었다면 자동으로 update처리 됩니다.",
  // })
  // async createOrUpdateSpot(
  //   @Args("createSpotInput") createSpotInput: CreateSpotInput
  // ): Promise<Spot> {
  //   const spot = await this.spotService.findOneByPlaceId(
  //     createSpotInput.placeId
  //   );

  //   if (spot === null) {
  //     return await this.spotService.create(createStickerInput);
  //   } else {
  //     return await this.spotService.update(spot._id, createStickerInput.emoji);
  //   }
  // }
  @Query(() => [Spot], {
    description: "(For Debugging) mongoDB에 저장된 모든 스팟 반환",
  })
  async getAllSpots(): Promise<Spot[]> {
    const result = await this.spotService.findAll();
    // console.log(result);
    return result;
  }

  @Mutation(() => DeleteSpotDto, {
    description: "(For Debugging) 스팟 하나 삭제",
  })
  async removeSpot(@Args("id", { type: () => String }) id: string) {
    return await this.spotService.remove(id);
  }

  @Query(() => [Spot], { description: "검색 키워드와 매칭되는 스팟들을 반환" })
  async getSpotsByKeyword(@Args("keyword") keyword: string): Promise<Spot[]> {
    return await this.spotService.getByKeyword(keyword);
  }

  @Query(() => Spot, {
    name: "spot",
    description: "(For Debugging) 카카오 place id로 스팟 검색",
  })
  async findOne(@Args("placeId", { type: () => String }) placeId: string) {
    const result = await this.spotService.findOneByPlaceId(placeId);
    if (result) {
      throw new HttpException(
        "There is no spots that matched by kakao id.",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @ResolveField(() => [Sticker], {
    description: "populate: true 경우 sticker값을 치환하여 반환합니다.",
  })
  async stickers(
    @Parent() spot: SpotDocument,
    @Args("populate") populate: boolean
  ) {
    if (populate) {
      return await this.spotService.populateStickers(spot._id);
    }
    return spot.stickers;
  }
}

// @Mutation(() => Spot)
// async updateSpot(@Args("updateSpotInput") updateSpotInput: UpdateSpotInput) {
//   return this.spotService.update(updateSpotInput.id, updateSpotInput);
// }

// @Mutation(() => DeleteSpotDto, {
//   description: "(For Debugging) 스팟 모두 삭제",
// })
// async removeAllSpots(): Promise<void> {
//   await this.spotService.removeAll();
// }
