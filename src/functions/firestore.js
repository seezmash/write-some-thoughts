import { db } from '../firebase'

// ========== Add data

const createUserDocument = (uid, firstName, lastName) => {
  console.log(uid)
  db.collection('users')
    .doc(uid)
    .set({
      firstName: firstName,
      lastName: lastName
    })
    .then(() => {
      console.log('Document successfully written!')
    })
    .catch((error) => {
      console.error('Error writing document: ', error)
    })
}

const addThoughtToDocument = (uid, newThoughtsArray) => {
  db.collection('cities')
    .doc('SF')
    .onSnapshot((doc) => {
      console.log('Current data: ', doc.data())
    })
  console.log(newThoughtsArray)
  db.collection('thoughts')
    .doc(uid)
    .set({
      thoughtsArray: newThoughtsArray
    })
    .then(() => {
      console.log('Document successfully written!')
    })
    .catch((error) => {
      console.error('Error writing document: ', error)
    })
}

// ========== Get data

const subToCurrentUserThoughts = (uid) => {
  let unsub = db
    .collection('thoughts')
    .doc(uid)
    .onSnapshot((doc) => {
      console.log('Current data: ', doc.data())
    })
}

export { createUserDocument, addThoughtToDocument, subToCurrentUserThoughts }
