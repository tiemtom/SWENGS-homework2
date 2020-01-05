import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CarListComponent} from './car-list/car-list.component';
import {ManufacturerListComponent} from './manufacturer-list/manufacturer-list.component';
import {CarFormComponent} from './car-form/car-form.component';
import {ManufacturerFormComponent} from './manufacturer-form/manufacturer-form.component';
import {ManufacturerOptionsResolver} from './resolver/maufacturer-options.resolver';
import {CarResolver} from './resolver/car.resolver';
import {CeoOptionResolver} from './resolver/ceo-option.resolver';
import {ManufacturerResolver} from './resolver/manufacturer.resolver';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'car-list', pathMatch: 'full' },
  { path: 'car-list', component: CarListComponent , canActivate: [AuthGuard]},
  { path: 'manufacturer-list', component: ManufacturerListComponent, canActivate: [AuthGuard] },
  { path: 'car-form',
    component: CarFormComponent,
   canActivate: [AuthGuard],
    resolve: {
      manufacturerOptions: ManufacturerOptionsResolver
    }
  },
  { path: 'car-form/:id',
    component: CarFormComponent,
   canActivate: [AuthGuard],
    resolve: {
      manufacturerOptions: ManufacturerOptionsResolver,
      car: CarResolver
    }
  },
  { path: 'manufacturer-form',
    component: ManufacturerFormComponent,
   canActivate: [AuthGuard],
    resolve: {
      ceoOptions: CeoOptionResolver
    }
  },
  { path: 'manufacturer-form/:id',
    component: ManufacturerFormComponent,
   canActivate: [AuthGuard],
    resolve: {
      ceoOptions: CeoOptionResolver,
      manufacturer: ManufacturerResolver
    }
  },
  {path: 'login' , component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
