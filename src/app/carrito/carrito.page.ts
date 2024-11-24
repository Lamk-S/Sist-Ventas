import { Component, OnInit } from '@angular/core';
import { ItemCarritoModel } from '../models/item-carrito.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  listaItemsCarrito:ItemCarritoModel[] | undefined;
  public total=0;

  constructor() { }

  ngOnInit() {
    this.MuestraCarrito();
  }

  VaciarCarrito(){
    localStorage.clear();
    this.listaItemsCarrito=[];
  }

  eliminarProductoCarrito(i:number){
    let carritoStorage=localStorage.getItem("carrito") as string;
    let carrito=JSON.parse(carritoStorage);
    carrito.splice(i,1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    this.MuestraCarrito();
  }

  MuestraCarrito(){
    let carritoStorage=localStorage.getItem("carrito") as string;
    let carrito=JSON.parse(carritoStorage);
    this.listaItemsCarrito=carrito;
    this.TotalCarrito();
  }

  TotalCarrito() {
    let carritoStorage=localStorage.getItem("carrito") as string;
    let carrito=JSON.parse(carritoStorage);
    let suma = 0;
    for (var i = 0; i < carrito.length; i++){
      suma += carrito[i].precio*carrito[i].cantidad;
    }
    this.total = suma;
  }

}
