import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) {
  }

  retrieveCeoOptions() {
    return this.http.get <any[]>('/api/person/options');
  }
}
