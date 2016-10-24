
import { createStore,compose,applyMiddleware } from 'redux';
import rootReducer from  '../Reducers/rootReducer.js'
import thunk from 'redux-thunk';


const middlewares = [thunk];
const createLogger = require('redux-logger');

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStore(rootReducer);
export default store;



