import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App';
// import * as serviceWorker from 'serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from 'reducers/index';
import config from 'resources/config'
import './styles.css'
import 'react-app-polyfill/ie9'

const env = config.environment();

if (env === config.ENVIRONMENTS.PRODUCTION) {
    console.log = () => {

    }
}

const middleware = (env === config.ENVIRONMENTS.PRODUCTION) ?
    applyMiddleware(thunk) : applyMiddleware(thunk, logger);

const store = createStore(
    rootReducer,
    middleware
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// serviceWorker.register();