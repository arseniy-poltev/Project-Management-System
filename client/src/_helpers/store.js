import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            thunkMiddleware,
            // loggerMiddleware,
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
);