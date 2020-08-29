import styled from 'styled-components';
import { darken } from 'polished';


export const Wrapper = styled.section`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100vw;
  max-width: 80rem;
  background: #2F2E41;
  padding: 2rem 5rem 5rem 5rem;
  color: #fff;
  text-align: center;
  border-radius: .5rem;

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

  a {
    margin-top: 2rem;
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }

  form {
    width: 100%;

    display: flex;

    .input-group {
      width: 100%;

      & + .input-group {
        margin-left: 2rem;
      }

      input[type="file"] {
        font-size: 1.25rem;
        margin-top: 4.15rem;
      }
    }
  }

  button {
    margin-top: 2rem;
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

    svg {
      margin-left: 1rem;
    }

    &:hover {
      background: ${darken(.05, '#6C63FF')};
    }
  }

  @media(max-width: 768px) {
    padding: 2rem;
    border-radius: 0;
    overflow: auto;

    form {
      flex-direction: column;

      .input-group + .input-group {
        margin-left: 0;

        input[type="file"] {
          margin-top: 2rem;
        }
      }
    }
  }
`;
