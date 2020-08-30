import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FaIdCard, FaSpinner } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

import { Input } from '../../components';
import logoImg from '../../assets/images/logo-mind.png';
import api from '../../services/api';

import { Wrapper, Container } from './styles';

interface FormData {
  fullName: string;
  email: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  avatar: FileList;
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
  password: yup.string().required('Campo obrigatório'),
  confirmPassword: yup
  .string()
  .required('Campo obrigatório')
  .oneOf([yup.ref('password')], 'Senhas não coincidem'),
});

const Register: React.FC = () => {
  const {
    handleSubmit,
    setValue,
    register,
    errors,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const history = useHistory();

  const handleRegister = handleSubmit(async ({
    fullName,
    email,
    cpf,
    password,
    avatar,
  }) => {
    try {
      setSending(prevState => !prevState);

      const formData = new FormData();

      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('cpf', cpf);
      formData.append('password', password);
      formData.append('avatar', avatar[0]);

      await api.post('/users', formData);

      alert('Usuário criado com sucesso!');

      history.push('/login');
    } catch(err) {
      console.warn(err);
      alert('Um erro ocorreu, tente novamente.');
    }

    setSending(prevState => !prevState);
  });

  return (
    <Wrapper>
      <Container>
        <img src={logoImg} alt="Mind Consulting Logo"/>

        <h1>Tela de cadastro</h1>
        <h2>Faça parte do nosso time!</h2>

        <form encType="multipart/form-data">
          <div className="input-group">
            <Input
              onChange={(e) => setValue('fullName', e.target.value)}
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
              labelName="CPF"
              name="cpf"
              type="text"
              register={register}
              placeholder="Digite seu CPF aqui"
              Icon={FaIdCard}
              error={errors.cpf}
            />
          </div>

          <div className="input-group">
            <Input
              onChange={(e) => setValue('password', e.target.value)}
              labelName="Senha"
              name="password"
              type={!passwordVisible ? "password" : "text"}
              register={register}
              placeholder="Digite sua senha aqui"
              Icon={!passwordVisible ? IoMdEyeOff : IoMdEye}
              onIconClick={() => setPasswordVisible(prevState => !prevState)}
              error={errors.password}
            />

            <Input
              onChange={(e) => setValue('confirmPassword', e.target.value)}
              labelName="Confirmar senha"
              name="confirmPassword"
              type={!passwordVisible ? "password" : "text"}
              register={register}
              placeholder="Digite sua senha novamente"
              Icon={!passwordVisible ? IoMdEyeOff : IoMdEye}
              onIconClick={() => setPasswordVisible(prevState => !prevState)}
              error={errors.confirmPassword}
            />

            <input
              type="file"
              id="avatar"
              name="avatar"
              ref={register}
              onChange={(e) => setValue('avatar', e.target.files!)}
            />
         </div>
        </form>

        <button type="button" onClick={handleRegister}>
          Me cadastrar {sending && <FaSpinner className="icon-spin" />}
        </button>

        <Link to="/login">
          Já sou cadastrado
        </Link>
      </Container>
    </Wrapper>
  );
}

export default Register;
