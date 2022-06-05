import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { WS_URL } from '../utils/const';
import { wsOrderActions } from './actions/feed';
import { socketMiddleware } from './middleware';
import { rootReducer } from './reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk, socketMiddleware(WS_URL, wsOrderActions))
);

export const store = createStore(rootReducer, enhancer);
