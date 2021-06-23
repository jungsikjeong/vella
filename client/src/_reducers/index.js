import { combineReducers } from 'redux';
import auth from './auth';
import toggle from './toggle';
import product from './product';
import review from './review';

export default combineReducers({ toggle, auth, product, review });
