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
import { SearchSpotDto } from "./dto/search-spot.dto";

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
  //     createSpotInput.place_id
  //   );

  //   if (spot === null) {
  //     return await this.spotService.create(createStickerInput);
  //   } else {
  //     return await this.spotService.update(spot._id, createStickerInput.emoji);
  //   }
  // }

  @Query(() => [Spot], {
    name: "spots",
    description: "searchSpotDto에 매칭되는 스팟들을 반환합니다.",
  })
  async findAll(
    @Args({ name: "searchSpotDto", nullable: true })
    searchSpotDto: SearchSpotDto
  ): Promise<Spot[]> {
    if (searchSpotDto === undefined) {
      return await this.spotService.findAll();
    }

    if ("keyword" in searchSpotDto) {
      if ("x" in searchSpotDto && "y" in searchSpotDto) {
        return await this.spotService.getNearSpotsByKeyword(searchSpotDto);
      }
      // x,y가 없을 경우
      return await this.spotService.getByKeyword(searchSpotDto);
    }

    // 키워드가 없을 경우
    return await this.spotService.getNearSpots(searchSpotDto);
  }

  @Mutation(() => DeleteSpotDto, {
    description: "(For Debugging) 스팟 하나 삭제",
  })
  async removeSpot(@Args("id", { type: () => String }) id: string) {
    return await this.spotService.remove(id);
  }

  @Query(() => Spot, {
    name: "spot",
    description: "(For Debugging) 카카오 place id로 스팟 검색",
  })
  async findOne(@Args("place_id", { type: () => String }) place_id: string) {
    const result = await this.spotService.findOneByPlaceId(place_id);
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
