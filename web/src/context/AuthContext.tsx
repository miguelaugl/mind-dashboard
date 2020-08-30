import React, { createContext } from 'react';

import useAuth from '../hooks/useAuth';
import { User, LoginData } from '../hooks/useAuth';

interface AuthProvider {
  loading: boolean;
  authenticated: boolean;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>
  handleLogin: ({ emailCpf, password }: LoginData) => Promise<void>;
  handleLogout: () => void;
}

const Context = createContext({} as AuthProvider);

const AuthProvider: React.FC = ({ children }) => {
  const {
    authenticated,
    user,
    setUser,
    loading,
    handleLogin,
    handleLogout,
  } = useAuth();

  return (
    <Context.Provider value={{
      authenticated,
      user,
      setUser,
      loading,
      handleLogin,
      handleLogout
    }}>
      {children}
    </Context.Provider>
  )
}

export { Context, AuthProvider };
