import React from 'react';

import { Container } from './styles';

import loadingImg from '../../assets/images/loading.svg';

const Loading: React.FC = () => {
  return (
    <Container>
      <img src={loadingImg} alt="Loading" />
    </Container>
  );
}

export default Loading;
