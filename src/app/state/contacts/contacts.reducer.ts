import {Contact} from '../../models/contact';
import {ContactsActions, ContactsActionTypes} from './contacts.actions';

export interface ContactsState {
    list: Array<Contact>;
    selectedContactId: number | string;
    loaded: boolean;
}

export const INITIAL_STATE: ContactsState = {
    list: [],
    selectedContactId: 0,
    loaded: false
};

export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions) {

    switch (action.type) {
        case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
            return {
                ...state, list: action.payload, loaded: true
            };
        case ContactsActionTypes.SELECT_CONTACT:
            return {...state, selectedContactId: action.payload};

        case ContactsActionTypes.UPDATE_CONTACT:
            const updatedList = state.list.map(contact => {
                return contact.id === action.payload.id
                    ? {...contact, ...action.payload}
                    : contact;
            });

            return {...state, list: updatedList};

        case ContactsActionTypes.ADD_CONTACT:
            const inStore = state.list.find(contact => {
                return contact.id == action.payload.id;
            });

            return {
                ...state,
                list: !inStore
                    ? [...state.list, action.payload]
                    : state.list
            };

        default :
            return state;
    }
}
