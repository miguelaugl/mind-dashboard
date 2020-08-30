import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.main`
  width: 100vw;
  max-width: 75rem;
  color: #fff;
  text-align: center;
  border-radius: 1rem;
  margin-top: -2rem;
  padding: 0 1rem;

  h1 {
    font-size: 4rem;
    margin-bottom: 1.5rem;
  }

  ul {
    width: 100%;
    padding-bottom: 2rem;
  }

  @media(min-width: 768px) {
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(26rem,1fr));
      grid-gap: 1.5rem;
    }
  }
`;
