import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

export const middlewares = [thunk];

export const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(...middlewares))(createStore)

export const store = createStoreWithMiddleware(rootReducer)