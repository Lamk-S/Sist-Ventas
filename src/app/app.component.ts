import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private authService: AuthService,
    private navCtrl: NavController) {}

  ngOnInit() {
    // Suscribirse al estado de login
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    });
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('login');
  }
}