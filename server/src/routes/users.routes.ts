import { Router } from 'express';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';

import UsersRepository from '../repositories/UsersRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { uploads, multerConfig } from '../config/multer';

const usersRouter = Router();

usersRouter.post('/', uploads.single('avatar'), async (request, response) => {
  try {
    const { fullName, cpf, email, password } = request.body;

    const { filename } = request.file;

    const usersRepository = getCustomRepository(UsersRepository);

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      fullName,
      cpf,
      email,
      password_hash: hashedPassword,
      avatar: `http://localhost:3333/files/${filename}`,
    });

    await usersRepository.save(user);

    delete user.password_hash;

    return response.status(201).json(user);
  } catch {
    return response.status(404).json({ message: 'An error ocurred' });
  }
});

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', async (request, response) => {
  const usersRepository = getCustomRepository(UsersRepository);

  const user = await usersRepository.findOne({
    where: { id: request.user.id },
  });

  if (user?.access_level !== 999) {
    throw new Error('Unauthorized request.');
  }

  const users = await usersRepository.find();

  const filteredUsers = users.filter(item => item.id !== user.id);

  return response.status(200).json(filteredUsers);
});

usersRouter.get('/:id', async (request, response) => {
  const usersRepository = getCustomRepository(UsersRepository);

  const user = await usersRepository.findOne({
    where: { id: request.params.id },
  });

  if (!user) {
    throw new Error('User not found');
  }

  delete user.password_hash;

  return response.status(200).json(user);
});

usersRouter.patch(
  '/:id',
  uploads.single('avatar'),
  async (request, response) => {
    const usersRepository = getCustomRepository(UsersRepository);

    const userToBeUpdatedId = request.params.id;

    const userId = request.user.id;

    if (userToBeUpdatedId !== userId) {
      const isAdmin = await usersRepository.findOneOrFail({
        where: { id: userId, access_level: 999 },
      });

      if (!isAdmin) {
        throw new Error('Unauthorizated request.');
      }
    }

    const updatedUser = await usersRepository.findOne(userToBeUpdatedId);

    let updatedData = {};

    if (request.file) {
      if (updatedUser?.avatar) {
        const userAvatarFilePath = path.join(
          multerConfig.directory,
          updatedUser.avatar,
        );
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

        if (userAvatarFileExists) {
          await fs.promises.unlink(userAvatarFilePath);
        }
      }

      const { filename } = request.file;

      updatedData = {
        avatar: filename,
      };
    }

    updatedData = {
      ...updatedData,
      ...request.body,
    };

    await usersRepository.update(userToBeUpdatedId, updatedData);

    delete updatedUser?.password_hash;

    return response.status(200).send(updatedUser);
  },
);

export default usersRouter;
