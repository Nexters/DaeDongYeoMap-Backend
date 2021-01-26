import { CreateStickerInput } from './create-sticker.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStickerInput extends PartialType(CreateStickerInput) {
  @Field(() => Int)
  id: number;
}
