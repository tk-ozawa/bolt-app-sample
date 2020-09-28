import { ThemeEntity } from "./theme.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateThemeDto } from "./dto/create-theme.dto";

@EntityRepository(ThemeEntity)
export class ThemeRepository extends Repository<ThemeEntity> {
  async createTheme({ title }: CreateThemeDto): Promise<ThemeEntity> {
    const theme = new ThemeEntity();
    theme.title = title;

    await theme.save();
    return theme;
  }
}
