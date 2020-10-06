import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ItemEntity } from "../items/item.entity";

@Entity({
  name: "themes",
})
export class ThemeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    type: "varchar",
  })
  public title!: string;

  @Column({
    type: "boolean",
    name: "is_open",
    default: () => false,
  })
  public isOpen!: boolean;

  @Column({
    type: "integer",
    name: "open_count",
    default: () => 0,
  })
  public openCount!: number;

  @OneToMany(() => ItemEntity, (item) => item.theme, { eager: true })
  public items?: ItemEntity[];

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt!: Date;
}
