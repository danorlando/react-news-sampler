import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { navigationReducer} from './navigationReducer';
import { userReducer } from './userReducer'

const rootReducer = combineReducers({
  navigationReducer,
  userReducer,
  router: routerReducer
});

export default rootReducer;
