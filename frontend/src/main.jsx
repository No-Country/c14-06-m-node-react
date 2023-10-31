import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { createGlobalStyle } from 'styled-components';

// eslint-disable-next-line react-refresh/only-export-components
const GlobalStyles = createGlobalStyle`
  
  :root {
    --primary: #0E76A8;
    --navbar-height: 70px;
  }
  
  /* Global Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Sora', sans-serif;
  }

  a {
  text-decoration: none; 
  color: inherit;

}
a:active{
  background-color: none;
  background: none;
  opacity: 1;
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
