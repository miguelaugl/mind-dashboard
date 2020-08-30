import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  ChangeEvent,
} from 'react';
import { MdEmail } from 'react-icons/md';
import { FaIdCard, FaSpinner } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import { Header, Loading, Input } from '../../components';
import api from '../../services/api';
import noPicture from '../../assets/images/no-profile-image.jpg';
import history from '../../history';
import { Context } from '../../context/AuthContext';

import {
  Wrapper,
  Container,
} from './styles';

interface FormData {
  fullName: string;
  email: string;
  cpf: string;
  avatar?: FileList;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  cpf: string;
  avatar: string;
  access_level: number;
}

interface ProfileProps {
  match: {
    params: {
      id: string;
    }
  }
}

const schema = yup.object().shape({
  fullName: yup.string()
    .required('Campo obrigatório')
    .max(25, 'Máximo de 25 caracteres'),
  email: yup
    .string()
    .email('Formato de email inválido')
    .required('Campo obrigatório')
    .max(40, 'Máximo de 40 caracteres'),
  cpf: yup
    .string()
    .required('Campo obrigatório')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
});

const Profile: React.FC<ProfileProps> = ({ match }) => {
  const { user: currentUser, setUser: setCurrentUser } = useContext(Context);

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);

  const isAdmin = currentUser.access_level === 999;

  const imageRef = useRef<HTMLImageElement>(null);

  const {
    handleSubmit,
    setValue,
    register,
    errors,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    (async () => {
      const { params: { id }} = match;

      const { data } = await api.get(`/users/${id}`);

      setUser(data);
      setLoading(false);
    })();
  }, [match]);

  const handleUpdate = handleSubmit(async ({
    fullName,
    email,
    cpf,
    avatar,
  }) => {
    try {
      setSending(prevState => !prevState);

      const formData = new FormData();

      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('cpf', cpf);

      if (avatar) {
        formData.append('avatar', avatar[0]);
      }

      const { data } = await api.patch('/users/' + user?.id, formData);

      if (currentUser.id !== user?.id) {
        history.push('/dashboard');
      } else {
        setCurrentUser(data);
      }

      alert('Dados atualizados com sucesso!');
    } catch(err) {
      console.warn(err);
      alert('Um erro ocorreu, tente novamente.');
    }

    setSending(prevState => !prevState);
  });

  function uploadImage(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files!;

    if (files[0]) {
      imageRef.current!.src = URL.createObjectURL(files[0]);

      setValue('avatar', files);
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Wrapper>
      <Header
        title="Perfil"
        description="Sinta-se livre para alterar os dados"
        logout={!isAdmin}
        showCredentials={!isAdmin}
      />

      <Container>
        <div>
          <form>
            <label htmlFor="file">
              <img
                src={user?.avatar ?
                  `${api.defaults.baseURL}/files/${user?.avatar}` : noPicture
                }
                alt="Imagem de perfil"
                ref={imageRef}
              />
            </label>

            <Input
              onChange={(e) => setValue('fullName', e.target.value)}
              defaultValue={user?.fullName}
              labelName="Nome completo"
              name="fullName"
              type="text"
              register={register}
              placeholder="Digite seu nome completo aqui"
              Icon={FaIdCard}
              error={errors.fullName}
            />

            <Input
              onChange={(e) => setValue('email', e.target.value)}
              defaultValue={user?.email}
              labelName="Email"
              name="email"
              type="text"
              register={register}
              placeholder="Digite seu email aqui"
              Icon={MdEmail}
              error={errors.email}
            />

            <Input
              onChange={(e) => setValue('cpf', e.target.value)}
              defaultValue={user?.cpf}
              labelName="CPF"
              name="cpf"
              type="text"
              register={register}
              placeholder="Digite seu CPF aqui"
              Icon={FaIdCard}
              error={errors.cpf}
            />

            <input
              id="file"
              name="file"
              type="file"
              ref={register}
              hidden
              onChange={uploadImage}
            />

            <button type="button" onClick={handleUpdate}>
              Atualizar dados {sending && <FaSpinner className="icon-spin" />}
            </button>
          </form>
        </div>
      </Container>
    </Wrapper>
  );
}

export default Profile;
