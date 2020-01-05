import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {ManufacturerService} from '../service/manufacturer.service';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerOptionsResolver implements Resolve<Observable<any>> {
  constructor(private countryService: ManufacturerService) {
  }

  resolve() {
    return this.countryService.retrieveManufacturerOptions();
  }
}
