import { combineReducers } from 'redux';
import auth from './auth';
import toggle from './toggle';

export default combineReducers({ toggle, auth });
