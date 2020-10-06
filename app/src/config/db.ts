import { ConnectionOptions } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { ItemEntity } from "../items/item.entity";
import { ThemeEntity } from "../themes/theme.entity";

export const dbconfig: ConnectionOptions = {
  type: "postgres",
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME),
  synchronize: true,
  logging: false,
  entities: [
    // "../**/*.entity{.ts,.js}"
    UserEntity,
    ItemEntity,
    ThemeEntity,
  ],
};
