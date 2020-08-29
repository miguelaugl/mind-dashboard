import React from 'react';
import { MdModeEdit, MdPowerSettingsNew } from 'react-icons/md';

import noPicture from '../../assets/images/no-profile-image.jpg';
import history from '../../history';

import {
  Container,
  Description,
  Actions,
} from './styles';

interface UserProps {
  id: string;
  fullName: string;
  email: string;
  cpf: string;
  avatar: string;
  access_level: number;
  onToggleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const User: React.FC<UserProps> = ({
  id,
  fullName,
  cpf,
  email,
  access_level,
  avatar,
  onToggleClick,
}) => {
  return (
    <Container style={{ opacity: access_level !== 0 ? '1' : '.6' }}>
      <Description>
        <img src={avatar || noPicture} alt="Imagem de perfil" />

        <div>
          <strong>{fullName}</strong>
          <p>{email}</p>
          <p>{cpf}</p>
        </div>
      </Description>

      <Actions>
        <button
          className="edit"
          onClick={() => history.push(`/profile/${id}`,)}
        >
          <MdModeEdit />
          Editar
        </button>

        <button
          className={access_level !== 0 ? "power access_level" : "power"}
          onClick={onToggleClick}
        >
          <MdPowerSettingsNew />
          {access_level !== 0 ? 'Desativar' : 'Ativar' }
        </button>
      </Actions>
    </Container>
  );
}

export default User;
