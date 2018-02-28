/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
//import configureStore, { history } from './store/configureStore';
import Root from './containers/Root';
import configureStore, {history} from './store/configureStore'
import './styles/App.css';
import {Provider} from 'react-redux';
import App from './containers/App';
import reducers from './reducers';
import { ConnectedRouter} from 'react-router-redux'
import { persistStore } from 'redux-persist';


//require('./favicon.ico'); // Tell webpack to load favicon.ico

const store = configureStore();

const persistor = persistStore(store);

render(
  <AppContainer>
    <Root store={store} persistor={persistor} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} persistor={persistor} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}

