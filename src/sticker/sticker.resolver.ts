import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { Types } from "mongoose";

import { SpotService } from "src/spot/spot.service";
import { Spot, SpotDocument } from "src/spot/entities/spot.entity";
import { StickerService } from "src/sticker/sticker.service";
import { Sticker, StickerDocument } from "./entities/sticker.entity";
import { CreateStickerInput, UpdateStickerInput } from "./dto/sticker.input";

@Resolver(() => Sticker)
export class StickerResolver {
  constructor(
    private readonly stickerService: StickerService,
    private readonly spotService: SpotService
  ) {}

  @Mutation(() => Sticker)
  async createSticker(
    @Args("createStickerInput") createStickerInput: CreateStickerInput
  ): Promise<Sticker> {
    return await this.stickerService.create(createStickerInput);
  }

  @Mutation(() => Sticker)
  async updateSticker(
    @Args("updateStickerInput") updateStickerInput: UpdateStickerInput
  ): Promise<Sticker> {
    return await this.stickerService.update(updateStickerInput);
  }

  @Query(() => [Sticker], { name: "stickers" })
  findAll() {
    return this.stickerService.findAll();
  }

  @Query(() => Sticker, { name: "sticker" })
  findOne(@Args("id", { type: () => String }) id: Types.ObjectId) {
    return this.stickerService.findOne(id);
  }

  @ResolveField(() => Spot, {
    description:
      "populate: true 경우 spot_id를 spot 값으로 치환하여 반환합니다.",
  })
  async spot(
    @Parent() sticker: StickerDocument,
    @Args("populate") populate: boolean
  ) {
    if (populate) {
      return await this.spotService.findOne(sticker.spot as Types.ObjectId);
    }
    return sticker.spot;
  }
}
