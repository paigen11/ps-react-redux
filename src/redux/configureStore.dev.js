import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
// this middleware warns if we accidentally mutate state
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
// used to make async calls with redux easier and the same syntax as nonasync calls
import thunk from 'redux-thunk';

// all that's needed to configure store is reducer and state
export default function configureStore(initialState) {
  // adds support for Redux devtools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())),
  );
}
