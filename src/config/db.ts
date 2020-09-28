import { ConnectionOptions } from "typeorm";

export const dbconfig: ConnectionOptions = {
  type: "postgres",
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME),
  synchronize: false,
  logging: false,
  entities: ["entities/*.ts"],
};
