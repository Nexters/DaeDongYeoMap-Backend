import { IsEmail, IsNotEmpty } from "class-validator";

export class SearchDto {
  @IsNotEmpty()
  readonly query: string;

  readonly display: number;
  readonly sort: string;
}
