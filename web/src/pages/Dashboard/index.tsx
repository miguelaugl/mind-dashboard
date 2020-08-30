import React, { useState, useEffect } from 'react';

import { User, Header, Loading } from '../../components';
import api from '../../services/api';
import history from '../../history';

import {
  Wrapper,
  Container,
} from './styles';

interface UserProps {
  id: string;
  fullName: string;
  email: string;
  cpf: string;
  access_level: number;
  avatar: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState([] as UserProps[]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/users');

        setUsers(data);
        setLoading(false);
      } catch {
        alert('Um erro ocorreu tente novamente.');

        history.push('/login');
      }
    })();
  }, []);

  async function toggleUser(userId: string, accessLevel: number) {
    try {
      const updatedData = {
        access_level: accessLevel ? 0 : 1,
      };

      const { data } = await api.patch('/users/' + userId, updatedData);

      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return data;
        }

        return user;
      });

      setUsers(updatedUsers);
    } catch(err) {
      console.warn(err);
      alert('Um erro ocorreu, tente novamente');
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Wrapper>
      <Header
        title="Dashboard"
        description="Estes são os usuários cadastrados na plataforma atualmente"
        logout={true}
      />

      <Container>
        <ul>
          {users.map(user => <User key={user.id} {...user} onToggleClick={() => toggleUser(user.id, user.access_level)} />)}
        </ul>
      </Container>
    </Wrapper>
);
}

export default Dashboard;
