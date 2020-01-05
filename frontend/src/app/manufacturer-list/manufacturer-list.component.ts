import {Component, OnInit} from '@angular/core';
import {ManufacturerService} from '../service/manufacturer.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss']
})
export class ManufacturerListComponent implements OnInit {

  manufacturers: any[];
  displayedColumns = ['name', 'country', 'founding_date', 'turnover', 'ceo_name', 'id'];

  constructor(private manufacturerService: ManufacturerService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.manufacturerService.getManufacturers()
      .subscribe((response: any[]) => {
        this.manufacturers = response;
      });
  }

  deleteManufacturer(manufacturer: any) {
    this.manufacturerService.deleteManufacturer(manufacturer)
      .subscribe(() => {
        this.ngOnInit();
        this.snackBar.open('Manufacturer entry deleted!', 'Dismiss',
          {
            duration: 3000
          });
      });
  }
}
