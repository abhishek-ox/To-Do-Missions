import { createGlobalStyle } from "styled-components";
import Contain from "./components/Contain";

function App() {
  return (
    <>
      <GlobalStyle />
      <Contain />
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: rgb(2,0,36);
    background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(3,3,62,1) 46%, rgba(0,212,255,1) 100%);
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh;
    width: 100vw;
  }
`;
