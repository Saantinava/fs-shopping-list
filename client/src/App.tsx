import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import store from './store';
import { createGlobalStyle } from 'styled-components';
import './styles/global.scss';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const App = () => (
  <Provider store={store}>
    <Router>
      <GlobalStyle />
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
