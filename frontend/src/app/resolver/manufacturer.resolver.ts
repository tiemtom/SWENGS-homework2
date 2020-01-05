import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {ManufacturerService} from '../service/manufacturer.service';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerResolver implements Resolve<Observable<any>> {
  constructor(private manufacturerService: ManufacturerService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.manufacturerService.getManufacturer(route.paramMap.get('id'));
  }
}
