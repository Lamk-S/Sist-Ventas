import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  // Verificar si el usuario está logueado
  isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
  }

  // Opción para cerrar sesión
  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}