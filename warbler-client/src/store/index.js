import rootReducer from "./reducers";                           //./reducers/index.js
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"                                 //delay evaluatin of sone expressions (for async code);

export function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      // window.devToolsExtention ? window.devToolsExtention() : f => f
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  return store;
}
