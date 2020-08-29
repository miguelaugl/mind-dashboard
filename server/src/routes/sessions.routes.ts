import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { emailCpf, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      emailCpf,
      password,
    });

    return response.json({ user, token });
  } catch (error) {
    return response.status(400).json({ error: error.messsage });
  }
});

export default sessionsRouter;
