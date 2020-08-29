import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #f8f9fa;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 400px;
    animation: loading 1s infinite linear;
  }
`;
