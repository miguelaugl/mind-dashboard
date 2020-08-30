import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <FaSpinner className="icon-spin" />
    </Container>
  );
}

export default Loading;
