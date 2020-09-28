import { IsNotEmpty, IsString } from "class-validator";

export class CreateThemeDto {
  @IsNotEmpty()
  @IsString()
  public title!: string;
}
