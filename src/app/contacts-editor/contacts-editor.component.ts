import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {SelectContactAction} from '../state/contacts/contacts.actions';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../state/app.state';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Component({
    selector: 'trm-contacts-editor',
    templateUrl: './contacts-editor.component.html',
    styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

    contact$: Observable<Contact>;

    constructor(private contactsService: ContactsService,
                private router: Router,
                private route: ActivatedRoute,
                private store: Store<ApplicationState>) {
    }

    ngOnInit() {

        this.contact$ = this.store.pipe(select(state => {
            return state.contacts.list.find(contact =>
                contact.id == state.contacts.selectedContactId);
        }),
        map(contact => ({...contact}))
    );
    }

    cancel(contact: Contact) {
        this.goToDetails(contact);
    }

    save(contact: Contact) {
        this.contactsService.updateContact(contact)
            .subscribe(() => this.goToDetails(contact));
    }

    private goToDetails(contact: Contact) {
        this.router.navigate(['/contact', contact.id]);
    }
}

