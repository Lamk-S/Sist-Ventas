import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarclientePageRoutingModule } from './agregarcliente-routing.module';

import { AgregarClientePage } from './agregarcliente.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule,
    AgregarclientePageRoutingModule
  ],
  declarations: [AgregarClientePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgregarclientePageModule {}
