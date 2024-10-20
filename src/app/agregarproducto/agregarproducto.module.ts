import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Agrega ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { AgregarproductoPageRoutingModule } from './agregarproducto-routing.module';

import { AgregarproductoPage } from './agregarproducto.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';  // Opcional, para manejar componentes personalizados

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Asegúrate de incluir ReactiveFormsModule
    IonicModule,
    AgregarproductoPageRoutingModule
  ],
  declarations: [AgregarproductoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Opcional, agregar si tienes problemas con componentes personalizados
})
export class AgregarproductoPageModule {}