import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {CategoriaModel } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url='http://localhost:8000/api/categoria';
  constructor(private http:HttpClient) { }
  
  // Obtener todas las categorías
  obtenerTodas(){
    return this.http.get<CategoriaModel[]>(this.url);
  }

  // Agregar nueva categoría
  agregarCategoria(categoria: CategoriaModel) {
    return this.http.post<CategoriaModel>(this.url, categoria);
  }

  // Actualizar una categoría existente
  actualizarCategoria(id: number, categoria: CategoriaModel) {
    return this.http.put<CategoriaModel>(`${this.url}/${id}`, categoria);
  }

  // Eliminar una categoría
  eliminarCategoria(id: number){
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}