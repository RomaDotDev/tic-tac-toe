import React from 'react';
import { createGlobalStyle } from 'styled-components';
import GameGrid from './components/GameGrid';

function App() {
  return (
    <article className="App">
      <GlobalStyle />
      <GameGrid />
    </article>
  );
}

// make styles apply outside of component scope
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #282c34;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default App;
