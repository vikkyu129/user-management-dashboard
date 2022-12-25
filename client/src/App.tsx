import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import "./App.css";
import HomePage from "./containers/HomePage";
import { Navabar } from "./components/navbar";
const PageContainer = styled.div`
  ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        overflow-x-hidden
    `}
`;

const AppContainer = styled.div`
  ${tw`
      w-full
      h-full
      flex
      flex-col
  `};
`;

function App() {
  return (
    <AppContainer>
      <HomePage />
    </AppContainer>
  );
}

export default App;
