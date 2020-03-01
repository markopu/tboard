import React from "react";
import "./App.css";
import { Board } from "./components/Board";
import styled, { createGlobalStyle } from "styled-components";



const GlobalStyle = createGlobalStyle`
  body {
    background-color: #2D729F;
  }
`
function App() {
    return (
      <>
          <Board />
          <GlobalStyle/>
</>
    )
}

export default App
