import styled from 'styled-components';
import { darken } from 'polished';

import backgroundImg from '../../assets/images/background-login.svg';

export const Wrapper = styled.section`
  background-image: url(${backgroundImg});
  background-size: 80rem;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 5rem;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: flex-end;
`;

export const Container = styled.div`
  width: 100vw;
  max-width: 50rem;
  background: #2F2E41;
  padding: 2rem 5rem 5rem 5rem;
  color: #fff;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 3.2rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  form {
    width: 100%;
    max-width: 32rem;

    button {
      margin-top: 2rem;
      background: #6C63FF;
      width: 100%;
      height: 5rem;
      border-radius: 2.5rem;
      text-transform: uppercase;
      font-weight: bold;
      color: #fff;
      transition: background-color .2s;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-left: 1rem;
      }

      &:hover {
        background: ${darken(.05, '#6C63FF')};
      }
    }
  }

  a {
    margin-top: 2rem;
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }

  @media(max-width: 768px) {
    padding: 2rem 1rem;
  }
`;
