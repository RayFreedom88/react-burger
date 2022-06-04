import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { store } from '../store';
import { TShopsActions } from '../actions/shop';
import { TAuthActions } from '../actions/auth';
import { TFeedActions } from '../actions/feed';

type TApplicationActions = TShopsActions | TAuthActions | TFeedActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = Dispatch<TApplicationActions>; 
