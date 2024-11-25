import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --background-color: #ECF5F2;
    --secondary-color: #FF7E08; 
    --primary-color: #045B3B;
    --text-color: #00140D;
    --border: #d4d4d6;
    --modal-background :#fbf8f8ff;
    --destructive: hsl(0 100% 61%);
    --backdrop : rgba(255, 255, 255, 0.1);
    --input-background: #F2F1F0; 
  }
  
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    transition: background-color 0.3s, border 0.3s;
  }

  html {
    font-size: 62.5%;
  }
  
  body {
    margin-left: auto;
    margin-right: auto;
    font-family: "Poppins", sans-serif;
    font-style: normal;
    overflow-wrap: break-word;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.8rem;
    font-size: 1.4rem ;

    min-width: 360px;
    max-width: 1440px;
    transition: color 0.3s, background-color 0.3s;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  img {
    display: block;
  }

  button {
    cursor: pointer;
    background: none;
    outline: none;
  }

  input:focus,
  textarea:focus,
  select:focus {
    background: none;
    outline: none;
  }

  input, button {
    outline: none;
    background: none;
    border: none;
  }

  *:disabled {
    cursor: no-drop;
  }

  @keyframes fadeOut {
    from {
      height: 400px;
      display: block;
    } to {
      height: 0;
      display: none;

    }
  }

  .modal-fade-out {
    animation: fadeOut 0.2s ease-out;
  }
  `;

export default GlobalStyles;
