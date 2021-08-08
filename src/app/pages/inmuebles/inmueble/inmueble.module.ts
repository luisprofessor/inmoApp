import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InmueblePageRoutingModule } from './inmueble-routing.module';

import { InmueblePage } from './inmueble.page';
import { ComponentsModule } from 'src/app/components/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InmueblePageRoutingModule,
    ComponentsModule
  ],
  declarations: [InmueblePage]
})
export class InmueblePageModule {}
