import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <div className="app">
        <Main />
      </div>
    </Provider>
  );
};

export default App;
