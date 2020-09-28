import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
}
