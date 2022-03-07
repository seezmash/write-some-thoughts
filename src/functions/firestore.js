import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

// ========== Add data

const createUserDocument = (uid, firstName, lastName) => {
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

const addThoughtToDocument = (uid, newThoughts) => {
  db.collection('thoughts')
    .doc(uid)
    .set({
      thoughtsArray: newThoughts
    })
    .then(() => {
      console.log('Document successfully written!')
    })
    .catch((error) => {
      console.error('Error writing document: ', error)
    })
}

// ========== Get data

const subToCurrentUserThoughts = async (uid) => {
  db.collection('thoughts')
    .doc(uid)
    .onSnapshot((doc) => {
      // console.log('Current data: ', doc.data())
      return doc.data
    })
  return null
}

export { createUserDocument, addThoughtToDocument, subToCurrentUserThoughts }
