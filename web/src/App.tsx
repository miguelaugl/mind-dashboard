import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './history';
import { AuthProvider } from './context/AuthContext';

import GlobalStyles from './assets/styles/global';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalStyles />
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
