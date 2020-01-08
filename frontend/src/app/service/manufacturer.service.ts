import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private http: HttpClient) {
  }

  getManufacturers() {
    return this.http.get('/api/manufacturer/list');
  }

  createManufacturer(manufacturer) {
    return this.http.post('/api/manufacturer/create', manufacturer);
  }

  updateManufacturer(manufacturer) {
    return this.http.put('/api/manufacturer/' + manufacturer.id + '/update', manufacturer);
  }

  getManufacturer(id) {
    return this.http.get('/api/manufacturer/' + id + '/get');
  }

  deleteManufacturer(manufacturer) {
    return this.http.delete('/api/manufacturer/' + manufacturer.id + '/delete');
  }

  retrieveManufacturerOptions() {
    return this.http.get <any[]>('/api/manufacturer/options');
  }

  getManufacturerCeoIds() {
    return this.http.get('api/manufacturer/ceos');
  }
}
