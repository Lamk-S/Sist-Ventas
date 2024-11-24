import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:8000/api/login";
  url2 = "http://localhost:8000/api/register";
  
  // BehaviorSubject para mantener el estado del login
  private loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(private http: HttpClient) {}

  // Método para verificar el estado del login
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Método para verificar si el usuario está logueado desde localStorage
  private checkLoginStatus(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  // Método para iniciar sesión
  login() {
    localStorage.setItem('loggedIn', 'true');
    this.loggedIn.next(true); // Actualizar el estado de loggedIn
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('loggedIn');
    this.loggedIn.next(false); // Actualizar el estado de loggedIn
  }

  public verificarEmail(email: string) {
    return this.http.get<any>(this.url + '/' + email);
  }

  public verificarClave(email: string, clave: string) {
    return this.http.post<any>(this.url + '/' + email + '/' + clave, {});
  }

  public registrarUsuario(email: string, password: string) {
    const data = {
      email: email,
      password: password
    };
    return this.http.post<any>(this.url2 + '/', data);
  }
}