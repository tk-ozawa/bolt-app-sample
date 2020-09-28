import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
