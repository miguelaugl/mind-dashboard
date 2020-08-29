import { Router } from 'express';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import UsersRepository from '../repositories/UsersRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploads from '../config/multer';

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

  const filteredUsers = users.filter(item => item.id !== request.user.id);

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

    let updatedData = {};

    if (request.file) {
      const { filename } = request.file;

      updatedData = {
        avatar: `http://localhost:3333/files/${filename}`,
      };
    }

    updatedData = {
      ...updatedData,
      ...request.body,
    };

    await usersRepository.update(userToBeUpdatedId, updatedData);

    const updatedUser = await usersRepository.findOne(userToBeUpdatedId);

    return response.status(200).send(updatedUser);
  },
);

export default usersRouter;
