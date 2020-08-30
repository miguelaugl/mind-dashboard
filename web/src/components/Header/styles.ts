import styled from 'styled-components';

export const Wrapper = styled.header`
  width: 100%;
  height: 30rem;
  background: #2F2E41;
`;

export const Container = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  color: #fff;
  padding: 5rem 1rem;
  position: relative;

  button {
    transition: transform .2s;
    margin-bottom: 3rem;
    background: #2F2E41;

    &:hover {
      transform: translateX(-.5rem);
    }
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 2.5rem;
    max-width: 40rem;
  }

  .credentials {
    position: absolute;
    top: 5rem;
    right: 1rem;
    cursor: pointer;

    display: flex;
    align-items: center;

    strong {
      font-size: 1.8rem;
      margin-right: 1rem;
    }

    img {
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
    }
  }
`;
