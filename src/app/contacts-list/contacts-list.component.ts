import {Component, OnInit} from '@angular/core';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../state/app.state';
import {LoadContactsSuccessAction} from '../state/contacts/contacts.actions';
import {Observable} from 'rxjs/internal/Observable';

@Component({
    selector: 'trm-contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

    contacts$: Observable<Array<Contact>>;

    constructor(private contactsService: ContactsService,
                private store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this.contacts$ = this.store.pipe(select((state) => state.contacts.list));

        this.contactsService
            .getContacts()
            .subscribe(contacts => {
                this.store.dispatch(
                    new LoadContactsSuccessAction(contacts)
                );
            });
    }

    trackByContactId(index, contact) {
        return contact.id;
    }
}
