import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import {reloadContacts, reloadUserInfo} from './action';
import { selectContacts, selectIsUserLoggedIn } from './selectors';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (stateFromServer) => {
    const store = createStore(reducer, stateFromServer, composeEnhancers(applyMiddleware(thunk)));
    if (!selectContacts(stateFromServer)) {
        store.dispatch(reloadContacts());
    }
    if (!selectIsUserLoggedIn(stateFromServer)) {
        store.dispatch(reloadUserInfo());
    }
    return store;
};