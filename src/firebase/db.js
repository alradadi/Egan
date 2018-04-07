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
    console.log('create stuff');
    var messageListRef = db.ref('incidents');
    var newMessageRef = messageListRef.push();
    newMessageRef.set({
        'title': title,
        'time': time,
        'reporter': reporter,
        'details': details,
    });
}
export const getIncident = (id) =>
    db.ref(`incidents/${id}`).once('value');
// Other db APIs ...
