const express = require('express');
const contacts = express.Router({});
const {getCollection} = require('../db');
const {ObjectID} = require('mongodb');

contacts.get('/', async (req, res) => {
    // get all user's contacts
    const users = await getCollection('users');
    const contacts = await getCollection('contacts');
    const currentUser = await users.findOne({_id: ObjectID(req.user._id)});
    if (!currentUser.contacts) {
        return res.json([]);
    }
    const userContacts = await contacts.find({_id: {$in: currentUser.contacts}});
    res.json(await userContacts.toArray());
});

contacts.get('/:id', async (req, res) => {
    //get user's contact by contact id
    const users = await getCollection('users');
    const contacts = await getCollection('contacts');

    const currentUser = await users.findOne({_id: ObjectID(req.user._id)});
    const {id} = req.params;
    if (!currentUser.contacts) {
        res.status(404);
        return res.end();
    }
    const contact = contacts.findOne({
        $and: [
            {_id: ObjectID(id)}, 
            {_id: {$in: currentUser.contacts}}
        ]
    });
    res.json(contact);
});

contacts.put('/', async (req, res) => {
    // put a new contact to db
    const users = await getCollection('users');
    const contacts = await getCollection('contacts');

    const {name, number} = req.body;
    const contactInsertion = await contacts.insertOne({name, number});
    users.updateOne({
        _id: ObjectID(req.user._id)
    }, {
        $push: {contacts: contactInsertion.insertedId}
    });
    res.status(200);
    res.end();
});

contacts.delete('/:id', async (req, res) => {
    //delete contact from db
    const users = await getCollection('users');
    const contacts = await getCollection('contacts');

    const currentUser = await users.findOne({_id: ObjectID(req.user._id)});
    const {id} = req.params;

    if (!currentUser.contacts) {
        res.status(404);
        return res.end();
    }

    const deletedContact = await contacts.findOneAndDelete({
        $and: [
            {_id: ObjectID(id)}, 
            {_id: {$in: currentUser.contacts}}
        ]
    });
    const deletedId = deletedContact.value._id;

    await users.updateOne({_id: currentUser._id}, {
        $set: {contacts: currentUser.contacts.filter(contact => contact._id !== deletedId)}
    });
    res.status(200);
    res.end();
});

contacts.post('/:id', async (req, res) => {
    //update contact data
    const users = await getCollection('users');
    const contacts = await getCollection('contacts');

    const currentUser = await users.findOne({_id: ObjectID(req.user._id)});
    const {id} = req.params;
    const {name, number} = req.body;

    if (!currentUser.contacts) {
        res.status(404);
        return res.end();
    }

    await contacts.updateOne({
        $and: [
            {_id: ObjectID(id)}, 
            {_id: {$in: currentUser.contacts}}
        ]
    }, {
        $set: {name, number}
    });
    res.status(200);
    res.end();
});

module.exports = contacts;
