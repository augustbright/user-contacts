import {combineReducers} from 'redux';
import contacts from './contacts';
import userInfo from './userInfo';

export default combineReducers({contacts, userInfo});
