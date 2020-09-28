import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "../users/user.entity";

@Entity()
export class ItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "text" })
  public title!: string;

  @Column({ name: "user_id" })
  public userId!: number;

  @ManyToOne(() => UserEntity, { eager: false })
  @JoinColumn({ name: "user_id" })
  public user?: UserEntity;

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
