import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { shopReducer } from './shop';
import { feedReducer } from './feed';

export const rootReducer = combineReducers({
    auth: authReducer,
    shop: shopReducer,
    feed: feedReducer,
});
