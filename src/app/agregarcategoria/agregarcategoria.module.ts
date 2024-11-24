import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarcategoriaPageRoutingModule } from './agregarcategoria-routing.module';


import { AgregarCategoriaPage } from './agregarcategoria.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgregarcategoriaPageRoutingModule
  ],
  declarations: [AgregarCategoriaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgregarcategoriaPageModule {}
