import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class CarService {
  // Init Http service
  constructor(private http: Http) {}
  // Ajax Call to get Makes
  getMakes() {
    return this.http.get('/carMakes')
              .map((carMakes)=>carMakes.json());
  }
  // Ajax Call to get Car 
  getCar(id) {
    return this.http.get('/carDetails/' + id)
                .map((car)=>car.json());
  }
}
