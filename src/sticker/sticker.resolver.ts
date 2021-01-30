import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { Types } from "mongoose";

import { SpotService } from "src/spot/spot.service";

import { StickerService } from "src/sticker/sticker.service";
import { Sticker } from "./entities/sticker.entity";
import { CreateStickerInput } from "./dto/create-sticker.input";
import { UpdateStickerInput } from "./dto/update-sticker.input";

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

  @Query(() => [Sticker], { name: "stickers" })
  findAll() {
    return this.stickerService.findAll();
  }

  @Query(() => Sticker, { name: "sticker" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.stickerService.findOne(id);
  }

  @Mutation(() => Sticker)
  updateSticker(
    @Args("updateStickerInput") updateStickerInput: UpdateStickerInput
  ) {
    return this.stickerService.update(
      updateStickerInput.id,
      updateStickerInput
    );
  }

  @Mutation(() => Sticker)
  removeSticker(@Args("id", { type: () => Int }) id: number) {
    return this.stickerService.remove(id);
  }
}
