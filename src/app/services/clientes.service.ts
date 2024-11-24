import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteModel } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private url = 'http://localhost:8000/api/cliente';  // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todos los clientes
  obtenerTodos(){
    return this.http.get<ClienteModel[]>(this.url);
  }

  // Agregar nuevo cliente
  agregarCliente(cliente: ClienteModel){
    return this.http.post<ClienteModel>(this.url, cliente);
  }

  // Actualizar un cliente existente
  actualizarCliente(id: number, cliente: ClienteModel){
    return this.http.put<ClienteModel>(`${this.url}/${id}`, cliente);
  }

  // Eliminar un cliente
  eliminarCliente(id: number){
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}