import {createSelector} from 'reselect';

export const selectContacts = state => state.contacts;

export const selectUserInfo = state => state.userInfo;
export const selectIsUserLoggedIn = state => !!selectUserInfo(state);

export const selectUserDisplayName = state => {
    const userInfo = selectUserInfo(state) || {};
    const userLoggedIn = selectIsUserLoggedIn(state);
    if (!userLoggedIn) {
        return '';
    }
    return userInfo.displayName;
}
