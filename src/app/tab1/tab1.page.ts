import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { TasaCambio } from '../models/prestamo.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  tasaCambio: TasaCambio | null = null;
  cargandoTasa: boolean = true;
  errorTasa: boolean = false;

  constructor(
  private apiService: ApiService,
  private alertCtrl: AlertController
) {}

  ngOnInit() {
    this.cargarTasaCambio();
  }

  cargarTasaCambio() {
    this.cargandoTasa = true;
    this.errorTasa = false;

    this.apiService.getTasaCambio().subscribe({
      next: (data) => {
        this.tasaCambio = data;
        this.cargandoTasa = false;
      },
      error: (err) => {
        console.error('Error al obtener tasa de cambio:', err);
        this.errorTasa = true;
        this.cargandoTasa = false;
      }
    });
  }
   onRefresh(event: any) {
    this.apiService.getTasaCambio().subscribe({
      next: (data) => {
        this.tasaCambio = data;
        this.errorTasa = false;
        event.target.complete();
      },
      error: (err) => {
        console.error('Error al refrescar tasa de cambio:', err);
        this.errorTasa = true;
        event.target.complete();
      }
    });
  }
  async onAccionRapida(accion: string) {
    const alert = await this.alertCtrl.create({
      header: 'Próximamente',
      message: 'Esta función estará disponible pronto.',
      buttons: ['Entendido']
    });
    await alert.present();
  }
}
