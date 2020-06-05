import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/Header';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <div className="app">
        <h1>Redux setup</h1>
      </div>
    </Provider>
  );
};

export default App;
