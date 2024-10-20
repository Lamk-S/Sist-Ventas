import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  ngOnInit() {}

  ionViewWillEnter() {
    // Verificar si el usuario está logueado al entrar en la vista
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['/login']); // Redirigir si no está logueado
    }
  }

}
