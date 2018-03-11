import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'


class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store // This corresponds to the `store` passed in as a prop
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: PropTypes.object
}

export default class Root extends Component {
 
 
  render() {
    const { store, history, persistor } = this.props;
    return (
      <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
         <App/> 
        </ConnectedRouter>
       </PersistGate>
      </Provider>
    );
  }
}

