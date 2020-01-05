import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CarService} from '../service/car.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  cars: any[];
  displayedColumns = ['name', 'manufacturer', 'build_date', 'distance_driven', 'damaged', 'id'];

  constructor(private http: HttpClient, private carService: CarService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.carService.getCars()
      .subscribe((response: any[]) => {
        this.cars = response;
      });
  }

  deleteCar(car: any) {
    this.carService.deleteCar(car)
      .subscribe(() => {
        this.ngOnInit();
        this.snackBar.open('Car entry deleted!', 'Dismiss',
          {
            duration: 3000
          });
      });
  }
}
