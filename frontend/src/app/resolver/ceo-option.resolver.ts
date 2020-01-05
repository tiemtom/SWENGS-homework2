import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {PersonService} from '../service/person.service';

@Injectable({
  providedIn: 'root'
})
export class CeoOptionResolver implements Resolve<Observable<any>> {
  constructor(private countryService: PersonService) {
  }

  resolve() {
    return this.countryService.retrieveCeoOptions();
  }
}
