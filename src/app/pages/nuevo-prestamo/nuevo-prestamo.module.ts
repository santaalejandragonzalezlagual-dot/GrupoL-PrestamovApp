import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoPrestamoPageRoutingModule } from './nuevo-prestamo-routing.module';

import { NuevoPrestamoPage } from './nuevo-prestamo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoPrestamoPageRoutingModule
  ],
  declarations: [NuevoPrestamoPage]
})
export class NuevoPrestamoPageModule {}
