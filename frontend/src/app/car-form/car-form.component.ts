import {Component, OnInit} from '@angular/core';
import {CarService} from '../service/car.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {

  carFormGroup;
  manufacturerOptions;

  constructor(private fb: FormBuilder, private carService: CarService, private route: ActivatedRoute,
              private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.manufacturerOptions = data.manufacturerOptions;

    this.carFormGroup = this.fb.group(
      {
        id: [null],
        name: ['', [Validators.required]],
        license_plate: ['', [Validators.required]],
        manufacturer: [[]],
        build_date: [null, [Validators.required]],
        distance_driven: [0],
        damaged: [false],
      });

    if (data.car) {
      this.carFormGroup.patchValue(data.car);
    }
  }

  createCar() {
    const car = this.carFormGroup.value;
    if (car.id) {
      this.carService.updateCar(car)
        .subscribe(() => {
          this.router.navigate(['/car-list']);
          this.snackBar.open('Car entry updated!', 'Dismiss',
            {
              duration: 3000
            });
        });
    } else {
      this.carService.createCar(car)
        .subscribe((response: any) => {
          this.router.navigate(['/car-list/']);
          this.snackBar.open('Car entry created!', 'Dismiss',
            {
              duration: 3000
            });
        });
    }
  }

}
