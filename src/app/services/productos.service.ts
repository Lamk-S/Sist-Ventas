import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ProductoModel } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url='http://localhost:8000/api/producto';
  constructor(private http:HttpClient ) { }

  ObtenerTodos(){
    return this.http.get<[ProductoModel]>(this.url);
  }
  Agregar(producto:ProductoModel){
    return this.http.post(this.url,producto);
  }
  Actualizar(idproducto: number, producto: ProductoModel) {
    return this.http.put(`${this.url}/${idproducto}`, producto);
  }
  Eliminar(idproducto: number) {
    return this.http.delete(`${this.url}/${idproducto}`);
  }

  obtenerProductosPorCategoria(){
    return this.http.get(`${this.url}/productos-por-categoria`);
  }
}  