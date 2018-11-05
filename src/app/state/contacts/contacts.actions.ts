import {Contact} from '../../models/contact';
import {Action} from '@ngrx/store';

export enum ContactsActionTypes {
    LOAD_CONTACTS_SUCCESS = '[Contacts] Load success',
    UPDATE_CONTACT = '[Contacts] Update contact',
    SELECT_CONTACT = '[Contacts] Select contact',
    ADD_CONTACT = '[Contacts] Add Contact'
}

export class LoadContactsSuccessAction implements Action {
    readonly type = ContactsActionTypes.LOAD_CONTACTS_SUCCESS;

    constructor(public payload: Array<Contact>) {
    }
}

export class SelectContactAction implements Action {
    readonly type = ContactsActionTypes.SELECT_CONTACT;

    constructor(public payload: number | string) {
    }
}

export class UpdateContactAction implements Action {
    readonly type = ContactsActionTypes.UPDATE_CONTACT;

    constructor(public payload: Contact) {
    }
}

export class AddContactAction implements Action {
    readonly type = ContactsActionTypes.ADD_CONTACT;

    constructor(public payload: Contact) { }
}

export type ContactsActions = AddContactAction | LoadContactsSuccessAction
    | SelectContactAction | UpdateContactAction;
