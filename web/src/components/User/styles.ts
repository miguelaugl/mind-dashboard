import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.li`
  background: #fff;
  padding: 2.5rem;
  border-radius: 1rem;
  color: #1e1a15;
  box-shadow: 0 0 0 .1rem rgba(0,0,0,.15), 0 .2rem .3rem rgba(0,0,0,.2);
  margin-bottom: 1.5rem;

  display: flex;
  flex-direction: column;

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    margin-bottom: 1.5rem;
  }
`;

export const Description = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;

      strong {
        font-size: 2.5rem;
      }

      p {
        font-size: 1.5rem;
        color: #1e1a15;

        &:first-of-type {
          font-weight: 500;
        }
      }
    }
`;

export const Actions = styled.div`
  margin-top: 2rem;

  display: flex;

  button {
    width: 100%;
    padding: 2rem 0;
    color: #fff;
    font-size: 2rem;
    border-radius: .5rem;
    transition: background-color .2s;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 3rem;
      font-weight: 700;
      margin-right: .5rem;
    }
  }

  .edit {
    background: #6C63FF;
    margin-right: 1rem;

    &:hover {
      background: ${darken(.05, '#6C63FF')};
    }
  }

  .power {
    &.active {
      background: #dc3545;

      &:hover {
        background: ${darken(.05, '#dc3545')};
      }
    }

    background: #28a745;

    &:hover {
      background: ${darken(.05, '#28a745')};
    }
  }

  @media(max-width: 500px) {
    button {
      font-size: 1.5rem;

      svg {
        font-size: 2rem;
      }
    }
  }
`;
