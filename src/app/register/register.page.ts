import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formRegister: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {
    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  async registrar() {
    const { email, password, confirmPassword } = this.formRegister.value;

    if (password !== confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    this.authService.registrarUsuario(email, password).subscribe(async (response) => {
      if (response.status === 201) {
        const alert = await this.alertController.create({
          header: 'Registro exitoso',
          message: 'Usuario registrado correctamente',
          buttons: ['Aceptar']
        });
        await alert.present();
        this.navCtrl.navigateRoot('login');
      }
    }, async (error) => {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.error.message || 'Ha ocurrido un error',
        buttons: ['Aceptar']
      });
      await alert.present();
    });
  }
}