const {getCollection} = require('../db');
const {ObjectID} = require('mongodb');


export const getAll = async (userID) => {
    // get all user's contacts
    const users = await getCollection('users');
    const contacts = await getCollection('contacts');
    const currentUser = await users.findOne({_id: ObjectID(userID)});
    if (!currentUser.contacts) {
        return [];
    }
    const userContacts = await contacts.find({_id: {$in: currentUser.contacts}});
    return await userContacts.toArray();
}