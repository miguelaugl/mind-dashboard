import React, { useContext } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import { Context } from '../../context/AuthContext';
import history from '../../history';

import {
  Wrapper,
  Container,
} from './styles';

interface HeaderProps {
  title: string;
  description: string;
  logout?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, description, logout }) => {
  const { handleLogout } = useContext(Context);

  return (
    <Wrapper>
      <Container>
        <button onClick={() => {
          if (logout) {
            return handleLogout();
          }

          history.goBack();
        }}>
          <FaArrowLeft size="30" color="#fff" />
        </button>

        <h1>{title}</h1>
        <p>{description}</p>
      </Container>
    </Wrapper>
  );
}

export default Header;
