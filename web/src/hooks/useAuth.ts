import { useState, useEffect } from 'react';

import api from '../services/api';
import history from '../history';

export interface User {
  id: string;
  fullName: string;
  access_level: number;
  avatar: string;
}

export interface LoginData {
  emailCpf: string;
  password: string;
}

export default function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin({ emailCpf, password }: LoginData) {
    const { data } = await api.post('/sessions', {
      emailCpf,
      password
    });

    const { user, token } = data;

    localStorage.setItem('token', JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    setUser(user);

    if (user.access_level === 999) {
      return history.push('/dashboard');
    }

    history.push('/profile/' + user.id);
  }

  function handleLogout() {
    setAuthenticated(false);
    setUser({} as User);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;

    history.push('/login');
  }

  return { authenticated, user, setUser, loading, handleLogin, handleLogout };
}
