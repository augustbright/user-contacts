import { SET_USER_INFO } from "../action";

const DEFAULT_STATE = null;

export default (prevState = DEFAULT_STATE, action) => {
    switch(action.type) {
        case SET_USER_INFO:
            return action.userInfo;
        default:
            return prevState;
    }
};
