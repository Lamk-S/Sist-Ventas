import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController, NavController } from '@ionic/angular';
import { NgZone } from '@angular/core';  // Importar NgZone

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9*-]+.[a-zAZ]{2,4}$")]),
      password: new FormControl('', [Validators.required])
    });
  }

  validation_messages = {
    email: [
      { type: 'required', message: 'Escribir correo' },
      { type: 'pattern', message: 'No es un formato de correo' }
    ],
    password: [
      { type: 'required', message: 'Escribir contraseña' }
    ]
  };

  constructor(
    private router: Router, 
    private authService: AuthService, 
    public alertController: AlertController, 
    public navCtrl: NavController, 
    public formBuilder: FormBuilder,
    private ngZone: NgZone  // Injectar NgZone
  ) {
    this.formLogin = this.createFormGroup();
  }

  ngOnInit() {}

  goToRegister() {
    this.navCtrl.navigateForward('register');
  }

  async iniciar() {
    let email = this.formLogin.value.email;
    this.authService.verificarEmail(email!).subscribe(async response => {
      if (response.data) {
        let password = this.formLogin.value.password;
        this.authService.verificarClave(email!, password!).subscribe(async resp => {
          if (resp.data) {
            // Guardar el estado de sesión
            localStorage.setItem('loggedIn', 'true');
            
            // Forzar la redirección y detectar cambios
            this.ngZone.run(() => {
              this.router.navigate(['/home'], { replaceUrl: true });
            });
          } else {
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'Contraseña incorrecta',
              buttons: ['Aceptar']
            });
            await alert.present();
          }
        });
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Correo no válido',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    }, (error) => {
      console.log(error);
    });
  }
}