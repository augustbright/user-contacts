import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import {reloadContacts} from './action';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (stateFromServer) => {
    const store = createStore(reducer, stateFromServer, composeEnhancers(applyMiddleware(thunk)));
    store.dispatch(reloadContacts());
    return store;
};