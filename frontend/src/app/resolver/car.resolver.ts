import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CarService} from '../service/car.service';

@Injectable({
  providedIn: 'root'
})
export class CarResolver implements Resolve<Observable<any>> {
  constructor(private carService: CarService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.carService.getCar(route.paramMap.get('id'));
  }
}
