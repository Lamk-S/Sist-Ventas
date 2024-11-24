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
      email: new FormControl('', [Validators.required, Validators.email]), // Mejorar la validación de email
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

  // Función para mostrar alertas
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  // Método para iniciar sesión
  async iniciar() {
    const email = this.formLogin.value.email;
    const password = this.formLogin.value.password;

    // Verificar el email
    this.authService.verificarEmail(email!).subscribe(async response => {
      if (response.data) {
        // Verificar la clave
        this.authService.verificarClave(email!, password!).subscribe(async resp => {
          if (resp.data) {
            // Llamar a login en el servicio de autenticación
            this.authService.login();
            
            // Redirigir a /home usando NgZone
            this.ngZone.run(() => {
              this.navCtrl.navigateRoot('home');
            });

          } else {
            // Mostrar alerta de contraseña incorrecta
            this.mostrarAlerta('Error', 'Contraseña incorrecta');
          }
        }, (error) => {
          console.log('Error verificando clave:', error);
          this.mostrarAlerta('Error', 'Error en la verificación de la clave.');
        });
      } else {
        // Mostrar alerta de email incorrecto
        this.mostrarAlerta('Error', 'Correo no válido');
      }
    }, (error) => {
      console.log('Error verificando email:', error);
      this.mostrarAlerta('Error', 'Error en la verificación del correo.');
    });
  }
}