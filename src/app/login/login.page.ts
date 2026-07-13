import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  email: string = '';
  password: string = '';
  cargando: boolean = false;
  errorMsg: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  onLogin() {
    this.errorMsg = '';

    if (!this.email || !this.password) {
      this.errorMsg = 'Por favor completa correo y contraseña.';
      return;
    }

    this.cargando = true;

    this.apiService.login(this.email, this.password).subscribe({
      next: async (respuesta) => {
        this.cargando = false;
        console.log('Login exitoso:', respuesta);

        // Muestra pantalla de carga antes de entrar al dashboard
        const loading = await this.loadingCtrl.create({
          message: 'Por favor espere...',
          spinner: 'crescent',
          duration: 1200,
          cssClass: 'custom-loading'
        });
        await loading.present();
        await loading.onDidDismiss();

        this.router.navigate(['/tabs/tab1']);
      },
      error: (error) => {
        this.cargando = false;
        this.errorMsg = 'No se pudo iniciar sesión. Intenta de nuevo.';
        console.error('Error de login:', error);
      }
    });
  }
}