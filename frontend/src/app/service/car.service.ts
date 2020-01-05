import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {
  }

  getCars() {
    return this.http.get('/api/car/list');
  }

  createCar(car) {
    return this.http.post('/api/car/create', car);
  }

  updateCar(car) {
    return this.http.put('/api/car/' + car.id + '/update', car);
  }

  getCar(id) {
    return this.http.get('/api/car/' + id + '/get');
  }

  deleteCar(car) {
    return this.http.delete('/api/car/' + car.id + '/delete');
  }
}
