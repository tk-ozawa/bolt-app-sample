import { IsNotEmpty, IsString } from "class-validator";

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  public title!: string;
}
