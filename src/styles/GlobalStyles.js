import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --background-color: #ECF5F2;
    --secondary-color: #FF7E08; 
    --primary-color: #045B3B;
    --text-color: #00140D;

    --input-background: #F2F1F0; 
  }
  
    *,
    *::before,
    *::after{
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

    min-width: 393px;
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

  ul {
    list-style: none; 
  }

  input:focus,
  textarea:focus,
  select:focus {
    background: none;
  }

  input, button{
    outline: none;
    background: none;
    border: none;
  }

  *:disabled {
    cursor: no-drop;
  }

  .active-tab {
    color: var(--secondary-color);  
  }

  /* swiper */
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }


  `;

export default GlobalStyles;
