import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });
export const onceGetUsers = () =>
  db.ref('users').once('value');


export const doCreateIncident = (title, time, reporter, site, details) => {
    const messageListRef = db.ref('incidents');
    messageListRef.push({
        'title': title,
        'time': time,
        'reporter': reporter,
        'details': details,
    });
};

export const getIncident = (id) =>
    db.ref(`incidents/${id}`).once('value');

export const getRequest= (id) =>
    db.ref(`requests/${id}`).once('value');



export const getSite = (id) =>
    db.ref(`sites/${id}`).once('value');


export const getAllSites = () =>
    db.ref('sites').once('value');


export const createSite = (obj) => {
    const ref = db.ref('sites');
    ref.push(obj);
};

export const updateIncident = (id, newValue) => {
    db.ref(`incidents/${id}`).update(newValue);
};

export const updateRequest = (id, newValue) => {
    db.ref(`requests/${id}`).update(newValue);
};

export const updateSite = (id, newValue) => {
    db.ref(`sites/${id}`).update(newValue);
};