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
  active: boolean;
  onToggleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const User: React.FC<UserProps> = ({
  id,
  fullName,
  cpf,
  email,
  active,
  avatar,
  onToggleClick,
}) => {
  return (
    <Container style={{ opacity: active ? '1' : '.6' }}>
      <Description>
        <img src={avatar || noPicture} alt="Naruto" />

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
          className={active ? "power active" : "power"}
          onClick={onToggleClick}
        >
          <MdPowerSettingsNew />
          {active ? 'Desativar' : 'Ativar' }
        </button>
      </Actions>
    </Container>
  );
}

export default User;
