import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import User from '../models/User';

interface Request {
  emailCpf: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticatedUserService {
  public async execute({ emailCpf, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: [{ email: emailCpf }, { cpf: emailCpf }],
    });

    if (!user) {
      throw new Error('Incorrect login combination.');
    }

    const passwordMatched = await compare(password, user.password_hash);

    if (!passwordMatched) {
      throw new Error('Incorrect login combination.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticatedUserService;
