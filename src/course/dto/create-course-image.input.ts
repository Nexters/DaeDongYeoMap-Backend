import { InputType, Field, registerEnumType } from "@nestjs/graphql";
import { Types } from "mongoose";

export enum ImageThemeType {
  dark = "dark-v10",
  light = "light-v10",
  street = "streets-v11",
}

registerEnumType(ImageThemeType, {
  name: "ImageThemeType",
});

@InputType()
export class CreateCourseImageInput {
  @Field(() => ImageThemeType, {
    description: "이미지 테마",
    nullable: true,
    defaultValue: ImageThemeType.street,
  })
  theme?: ImageThemeType;

  @Field(() => Number, {
    description: "이미지 가로 사이즈",
    nullable: true,
    defaultValue: 700,
  })
  width?: number;

  @Field(() => Number, {
    description: "이미지 세로 사이즈",
    nullable: true,
    defaultValue: 700,
  })
  height?: number;
}
