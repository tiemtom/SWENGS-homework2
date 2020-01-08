import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ManufacturerService} from '../service/manufacturer.service';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.scss']
})
export class ManufacturerFormComponent implements OnInit {

  manufacturerFormGroup;
  ceoOptions;

  constructor(private fb: FormBuilder, private manufacturerService: ManufacturerService, private route: ActivatedRoute,
              private router: Router, private snackBar: MatSnackBar ) {
  }

  ngOnInit() {
    this.ceoValidator();
    const data = this.route.snapshot.data;
    this.ceoOptions = data.ceoOptions;

    this.manufacturerFormGroup = this.fb.group(
      {
        id: [null],
        name: ['', [Validators.required]],
        country: ['', [Validators.required]],
        founding_date: [null, [Validators.required]],
        turnover: [0],
        ceo: [[], [], [this.ceoValidator()]],
      });

    if (data.manufacturer) {
      this.manufacturerFormGroup.patchValue(data.manufacturer);
    }
  }

  createManufacturer() {
    const manufacturer = this.manufacturerFormGroup.value;
    if (manufacturer.id) {
      this.manufacturerService.updateManufacturer(manufacturer)
        .subscribe(() => {
          this.router.navigate(['/manufacturer-list']);
          this.snackBar.open('Manufacturer entry updated!', 'Dismiss',
            {
              duration: 3000
            });
        });
    } else {
      this.manufacturerService.createManufacturer(manufacturer)
        .subscribe((response: any) => {
          this.router.navigate(['/manufacturer-list/']);
          this.snackBar.open('Manufacturer entry created!', 'Dismiss',
            {
              duration: 3000
            });
        });
    }
  }

  ceoValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.manufacturerService.getManufacturerCeoIds()
        .pipe(
          map((ceos: any[]) => {
            const currentId = this.manufacturerFormGroup.controls.id.value;
            const currentCeo = this.manufacturerFormGroup.controls.ceo.value;
            const activeCeo = ceos.find((m) => {
              return (m.id !== currentId) && m.ceo === currentCeo;
            });
            if (activeCeo) {
              return {
                activeCeo: true
              };
            } else {
              return null;
            }
          })
        );
    };
  }
}

