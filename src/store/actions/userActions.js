import { contactService } from '../../services/contactService';
import { storageService } from '../../services/storageService';
const STORAGE_KEY = 'user';

export function signup(newUser) {
  return async (dispatch) => {
    const contacts = await contactService.getContacts();
    if (
      contacts.some(
        (contact) => contact.name === newUser.name && contact.email === newUser
      )
    )
      throw new Error('User already exists');
    else {
      var user = await contactService.saveContact(newUser);
      console.log(user);
      storageService.store(STORAGE_KEY, user);
      dispatch({ type: 'SET_LOGGED_IN_USER', user });
    }
  };
}
export function transfer(to, from, amount) {
  console.log('to', to, 'from', from);
  return async (dispatch) => {
    let updated = contactService.transfer(to, from, amount);
    console.log(updated);
    dispatch({ type: 'UPDATE_CONTACT', contact: updated[0] });
    dispatch({ type: 'UPDATE_CONTACT', contact: updated[1] });
    storageService.store(STORAGE_KEY, updated[1])
  };
}
export function loggedIn() {
  return async (dispatch) => {
    let newUser = storageService.load(STORAGE_KEY);
    dispatch({ type: 'SET_LOGGED_IN_USER', user: newUser });
  };
}
export function login(name) {
  return async (dispatch) => {
    const contacts = await contactService.getContacts();
    let user = contacts.find((contact) => contact.name === name);
    dispatch({ type: 'SET_LOGGED_IN_USER', user });
  };
}

export function logout() {
  return async (dispatch) => {
    storageService.store(STORAGE_KEY, null);
    dispatch({ type: 'LOGOUT' });
  };
}
