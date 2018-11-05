import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ContactsService} from './contacts.service';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {RouterStateSnapshot} from '@angular/router/src/router_state';
import {Observable, of} from 'rxjs/index';
import {ApplicationState} from './state/app.state';
import {AddContactAction, SelectContactAction} from './state/contacts/contacts.actions';
import {map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {Contact} from './models/contact';

@Injectable()
export class ContactExistsGuard implements CanActivate {

    constructor(private store: Store<ApplicationState>,
                private contactsService: ContactsService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const contactId = route.paramMap.get('id');
        this.store.dispatch(new SelectContactAction(+contactId));

        const resolveOrAddContactToList = (loaded: boolean) => {

            const addContactToList = (contact: Contact) => {
                this.store.dispatch(new AddContactAction(contact));
            };

            return loaded ? of(true) : this.contactsService
                .getContact(contactId).pipe(
                    tap(addContactToList),
                    map(contact => !!contact)
                );

        };

        return this.store
            .pipe(
                select(state => state.contacts.loaded),
                switchMap(resolveOrAddContactToList));
    }
}
