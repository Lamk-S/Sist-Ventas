import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarClientePage } from './agregarcliente.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarclientePageRoutingModule {}
