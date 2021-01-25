import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
