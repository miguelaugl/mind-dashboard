import styled from 'styled-components';

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;

  display: flex;
  flex-direction: column;

  label {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  span {
    position: absolute;
    right: 1rem;
    bottom: 1rem;

    display: flex;

    &.input-error {
      p {
        display: block;
      }
    }

    p {
      display: none;
      position: absolute;
      background: #de0f49;
      padding: 1rem 0.5rem;
      width: 18.5rem;
      border-radius: .5rem;
      left: calc(50% - 18.5rem / 2);
      bottom: 2.1rem;
      visibility: hidden;
      opacity: 0;
      transition: opacity .4s;
    }

    &:hover {
      p {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  input {
    border: 1px solid transparent;
    border-radius: .5rem;
    height: 4rem;
    padding: 0 3.5rem 0 1.5rem;
    font-size: 1.5rem;
  }

  @media(max-width: 768px) {
    label {
      font-size: 1.4rem;
    }
  }
`;
