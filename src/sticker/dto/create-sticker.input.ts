import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStickerInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
