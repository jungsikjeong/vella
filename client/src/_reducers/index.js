import { combineReducers } from 'redux';
import auth from './auth';
import toggle from './toggle';
import product from './product';

export default combineReducers({ toggle, auth, product });
