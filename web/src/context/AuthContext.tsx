import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';
import history from '../history';
import { Loading } from '../components';

interface LoginData {
  emailCpf: string;
  password: string;
}

interface AuthProvider {
  authenticated: boolean;
  handleLogin: ({ emailCpf, password }: LoginData) => Promise<void>;
  handleLogout: () => void;
}

const Context = createContext({} as AuthProvider);

const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {

      const token = localStorage.getItem('token');

      if (token) {
        const userId = JSON.parse(localStorage.getItem('user_id')!);

        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        setAuthenticated(true);

        const { data: { id, access_level } } = await api.get('/users/' + userId);

        if (access_level === 999) {
          return history.push('/dashboard');
        }

        history.push('/profile/' + id);
      }

    })();

    setLoading(false);

  }, []);

  async function handleLogin({ emailCpf, password }: LoginData) {
    const { data } = await api.post('/sessions', {
      emailCpf,
      password
    });

    const { user, token } = data;

    if (user.access_level === 0) {
      alert('Sua conta está desativada.');
      return;
    }

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user_id', JSON.stringify(user.id));
    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (user.access_level === 999) {
      return history.push('/dashboard');
    }

    history.push('/profile/' + user.id);

    setAuthenticated(true);
  }

  function handleLogout() {
    setAuthenticated(false);

    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;

    history.push('/login');
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Context.Provider value={{ authenticated, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  )
}

export { Context, AuthProvider };
