import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StickerService } from './sticker.service';
import { Sticker } from './entities/sticker.entity';
import { CreateStickerInput } from './dto/create-sticker.input';
import { UpdateStickerInput } from './dto/update-sticker.input';

@Resolver(() => Sticker)
export class StickerResolver {
  constructor(private readonly stickerService: StickerService) {}

  @Mutation(() => Sticker)
  createSticker(@Args('createStickerInput') createStickerInput: CreateStickerInput) {
    return this.stickerService.create(createStickerInput);
  }

  @Query(() => [Sticker], { name: 'sticker' })
  findAll() {
    return this.stickerService.findAll();
  }

  @Query(() => Sticker, { name: 'sticker' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stickerService.findOne(id);
  }

  @Mutation(() => Sticker)
  updateSticker(@Args('updateStickerInput') updateStickerInput: UpdateStickerInput) {
    return this.stickerService.update(updateStickerInput.id, updateStickerInput);
  }

  @Mutation(() => Sticker)
  removeSticker(@Args('id', { type: () => Int }) id: number) {
    return this.stickerService.remove(id);
  }
}
