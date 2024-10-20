import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:8000/api/login";
  url2 = "http://localhost:8000/api/register";
  constructor( private http:HttpClient) { }
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
