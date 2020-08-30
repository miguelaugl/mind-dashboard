import React, { useContext } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import { Context } from '../../context/AuthContext';
import history from '../../history';
import noPicture from '../../assets/images/no-profile-image.jpg';

import {
  Wrapper,
  Container,
} from './styles';

interface HeaderProps {
  title: string;
  description: string;
  logout?: boolean;
  showCredentials?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  description,
  logout,
  showCredentials = true,
}) => {
  const { user, handleLogout } = useContext(Context);

  return (
    <Wrapper>
      <Container>
        <button onClick={() => {
          if (logout) {
            return handleLogout();
          }

          history.push('/dashboard');
        }}>
          <FaArrowLeft size="30" color="#fff" />
        </button>

        <h1>{title}</h1>
        <p>{description}</p>

        {showCredentials && (
          <div
            className="credentials"
            onClick={() => history.push(`/profile/${user.id}`)}
          >
            <strong>{user.fullName}</strong>

            <img src={user.avatar || noPicture} alt="Imagem de perfil" />
          </div>
        )}
      </Container>
    </Wrapper>
  );
}

export default Header;
