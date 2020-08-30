import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.section`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.main`
  width: 100vw;
  max-width: 70rem;
  color: #fff;
  text-align: center;
  border-radius: 1rem;
  margin-top: -2rem;
  padding: 0 1rem;

  > div {
    background: #f5f5f5;
    border-radius: 1rem;
    padding: 4rem 2.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 0 0 .1rem rgba(0,0,0,.15), 0 .2rem .3rem rgba(0,0,0,.2);

    form {
      width: 100%;
      max-width: 36rem;
      margin: 0 auto;

      img {
        width: 20rem;
        height: 20rem;
        border-radius: 50%;
        margin-bottom: 2rem;
        transition: filter .4s;
        cursor: pointer;

        &:hover {
          filter: brightness(.9);
        }
      }

      label {
        color: #2F2E41;
      }

      input {
        border-color: #2F2E41;
      }

      button {
        margin: 2rem auto 2rem auto;
        background: #6C63FF;
        width: 100%;
        max-width: 32rem;
        height: 5rem;
        border-radius: 2.5rem;
        text-transform: uppercase;
        font-weight: bold;
        color: #fff;
        transition: background-color .2s;

        display: flex;
        align-items: center;
        justify-content: center;

        > svg {
          margin-left: 1rem;
        }

        &:hover {
          background: ${darken(.05, '#6C63FF')};
        }
      }
    }
  }
`;
