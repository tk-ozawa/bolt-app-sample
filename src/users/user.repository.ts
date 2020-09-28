import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "./user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(slackId: string): Promise<UserEntity> {
    const user = new UserEntity();
    user.slackId = slackId;

    await user.save();
    return user;
  }
}
