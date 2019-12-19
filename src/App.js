import React from 'react';
import Routes from './routes';
import Header from './components/Header';

import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />{/*/importa as minhas rotas criadas*/}
    </BrowserRouter>
  );
}

export default App;
