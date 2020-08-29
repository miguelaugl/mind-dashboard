import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 62.5%;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    box-sizing: border-box;
  }

  /* html, body, #root {
    height: 100vh;
  } */

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body,
  input,
  button,
  textarea {
    font: 400 1.6rem Roboto;
  }

  body {
    background: #f8f9fa;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  .icon-spin {
    animation: icon-spin 2s infinite linear;
  }

  @keyframes icon-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }

  @keyframes loading {
    0% {
      transform: scale(0.9099999999999999);
    } 51% {
      transform: scale(1.02994);
    } 100% {
      transform: scale(0.9099999999999999);
    }
  }
`;

export default GlobalStyles;
