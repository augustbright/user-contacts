import { SET_CONTACTS } from "../action";

const DEFAULT_STATE = [];

export default (prevState = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_CONTACTS:
            return action.contacts;
        default:
            return prevState;
    }
};
