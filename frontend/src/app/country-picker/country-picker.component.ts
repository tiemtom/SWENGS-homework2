import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Country {
  flag: string;
  name: string;
}

/**
 * @title Autocomplete overview
 */
@Component({
  selector: 'app-country-picker',
  templateUrl: './country-picker.component.html',
  styleUrls: ['./country-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountryPickerComponent),
      multi: true
    }
  ]
})
export class CountryPickerComponent implements ControlValueAccessor, OnInit {

  country = new FormControl();
  private propagateChange: any;
  filteredCountries: Observable<Country[]>;

  countries: Country[] = [
    {
      name: 'Austria',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg'
    },
    {
      name: 'Germany',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg'
    },
    {
      name: 'France',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_France_%287x10%29.svg'
    },
    {
      name: 'Other',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/A_blank_flag.png'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.filteredCountries = this.country.valueChanges
      .pipe(
        startWith(''),
        map(country => country ? this._filterCountries(country) : this.countries.slice())
      );
  }

  ngOnInit() {
    this.country = this.fb.control(null);
    this.country.valueChanges.subscribe((newValue) => {
      this.propagateChange(newValue);
    });



  }

  private _filterCountries(value: string): Country[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.country.patchValue(obj, {emitEvent: false});
  }
}
