import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ItemEntity } from "../items/item.entity";

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    type: "varchar",
    name: "slack_id",
    length: 255,
  })
  public slackId!: string;

  @OneToMany(() => ItemEntity, (item) => item.user, { eager: true })
  public items?: ItemEntity[];
}
