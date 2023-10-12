import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Global Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

    body {
    font-family: 'Sora', sans-serif;
  
  }


  /* AppContainer */

  //Lo deje comentado hasta trabajar en el Responsive
  #root {
    /* max-width: 1200px; */
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

  }

  a {
  text-decoration: none; 
  color: inherit;
}
`;

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<React.StrictMode>
			<GlobalStyles />
			<App />
		</React.StrictMode>
	</BrowserRouter>
);
