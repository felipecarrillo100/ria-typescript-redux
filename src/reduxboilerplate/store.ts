import { applyMiddleware, combineReducers, createStore } from 'redux';

import thunk from 'redux-thunk';
import { mapReducer } from "./luciadmap/reducer";

const reducers = combineReducers({
    map: mapReducer,
});

export type IAppState = ReturnType<typeof reducers>;
export const store = createStore(reducers, applyMiddleware(thunk));
