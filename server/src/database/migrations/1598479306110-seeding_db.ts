import { getCustomRepository, MigrationInterface, QueryRunner } from 'typeorm';

import UsersRepository from '../../repositories/UsersRepository';
import userSeed from '../../seeds/user.seed';

export default class seedingDb1598479306110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    await usersRepository.save(userSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
