import { contactService } from '../../services/contactService';

export function loadContacts() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().contactModule;
    try {
      const contacts = await contactService.getContacts(filterBy);
      dispatch({ type: 'SET_CONTACTS', contacts });
    } catch (err) {
      console.log(err);
    }
  };
}
export function addContact(currContact) {
  return async (dispatch) => {
    try {
      let contact = await contactService.saveContact(currContact);
      dispatch({ type: 'ADD_CONTACT', contact });
    } catch (err) {
      console.log(err);
    }
  };
}

export function removeContact(contactId) {
  return async (dispatch) => {
    try {
      await contactService.deleteContact(contactId);
      dispatch({ type: 'REMOVE_CONTACT', contactId });
    } catch (err) {
      console.log(err);
    }
  };
}

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy });
  };
}
export function setSelectedContact(contactId) {
  return async (dispatch) => {
    try {
      const contact = await contactService.getContactById(contactId);
      dispatch({ type: 'SET_CONTACT', contact });
    } catch (err) {
      console.log(err);
    }
  };
}
export function getContactById(contactId) {
  return async () => {
    return await contactService.getContactById(contactId);
  };
}
