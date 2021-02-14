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
import { CreateCustomSpotInput } from "./dto/create-custom-spot.input";
import { CreateSpotInput } from "./dto/create-spot.input";
import { DeleteSpotDto } from "../spot/dto/delete.spot.dto";
import { SearchSpotDto } from "./dto/search-spot.dto";

@Resolver(() => Spot)
export class SpotResolver {
  constructor(private readonly spotService: SpotService) {}

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

  @Mutation(() => Spot, {
    name: "customSpot",
    description: "커스텀 스팟을 생성/업데이트합니다.",
  })
  async createCustomSpot(
    @Args("createCustomSpotInput") createCustomSpotInput: CreateCustomSpotInput
  ): Promise<Spot> {
    return await this.spotService.createCustomSpot(createCustomSpotInput);
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
