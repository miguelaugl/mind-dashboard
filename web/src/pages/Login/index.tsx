import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import { Input } from '../../components';
import logoImg from '../../assets/images/logo-mind.png';
import { Context } from '../../context/AuthContext';

import { Wrapper, Container } from './styles';

interface FormData {
  emailCpf: string;
  password: string;
}

const schema = yup.object().shape({
  emailCpf: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

const Login: React.FC = () => {
  const { handleSubmit, setValue, register, errors } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { handleLogin } = useContext(Context);

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [logging, setLogging] = useState<boolean>(false);

  const handleButtonLoginClick = handleSubmit(async (formValues) => {
    try {
      setLogging(prevState => !prevState);

      await handleLogin!(formValues);
    } catch(err) {
      console.warn(err);
      alert('Combinação de login incorreta');
    }

    setLogging(prevState => !prevState);
  });

  return (
    <Wrapper>
      <Container>
        <img src={logoImg} alt="Mind Consulting Logo"/>

        <h1>Bem-vindo!</h1>
        <h2>Fique à vontade para realizar seu login</h2>

        <form>
          <Input
            onChange={(e) => setValue('emailCpf', e.target.value)}
            labelName="Email ou CPF"
            name="emailCpf"
            type="text"
            register={register}
            placeholder="Digite seu email ou CPF aqui"
            Icon={MdEmail}
            error={errors.emailCpf}
          />

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

          <button type="button" onClick={handleButtonLoginClick}>
            Login {logging && <FaSpinner className="icon-spin" />}
          </button>
        </form>

        <Link to="/register">
          Cadastrar-se
        </Link>
      </Container>
    </Wrapper>
  );
}

export default Login;
