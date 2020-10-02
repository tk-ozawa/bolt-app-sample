import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser({ slackId }: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.slackId = slackId;

    await user.save();
    return user;
  }
}
