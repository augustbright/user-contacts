import {SET_CONTACTS} from "./types";


export const setContacts = contacts => ({
    type: SET_CONTACTS,
    contacts
});

export const reloadContacts = () => async dispatch => {
    // fetch contacts
    const contactsResponse = await fetch('/api/contacts/', {
        method: 'GET'
    });
    const contacts = await contactsResponse.json();

    //set contacts
    dispatch(setContacts(contacts));
};

export const putContact = ({name, number}) => async dispatch => {
    await fetch('/api/contacts', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, number})
    });
    await dispatch(reloadContacts());
};

export const updateContact = ({id, name, number}) => async dispatch => {
    await fetch(`/api/contacts/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, number})
    });
    return dispatch(reloadContacts());
};

export const deleteContact = id => async dispatch => {
    await fetch(`/api/contacts/${id}`, {
        method: 'DELETE'
    });
    return dispatch(reloadContacts());
};