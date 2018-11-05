import {Contact} from '../../models/contact';

export enum ContactsActionTypes {
    LOAD_CONTACTS_SUCCESS = '[Contacts] Load success'
}

export class LoadContactsSuccessAction {
    readonly type = ContactsActionTypes.LOAD_CONTACTS_SUCCESS;
    constructor(public payload: Array<Contact>) { }
}

export type ContactsActions = LoadContactsSuccessAction;