import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; // <-- 1. Importamos el Storage de Ionic
import { NuevoPrestamoPage } from '../pages/nuevo-prestamo/nuevo-prestamo.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  // VARIABLES DE ANDRY (TASA DE CAMBIO)
  cargandoTasa: boolean = false;
  errorTasa: boolean = false;
  tasaCambio: any = { dop: 59.50, fecha: 'Hoy' };

  // TU LISTA DE PRÉSTAMOS
  listaPrestamos: any[] = [];

  // 2. Inyectamos "Storage" en el constructor junto al controlador de modales
  constructor(
    private modalCtrl: ModalController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    // 3. Inicializamos el almacenamiento de Ionic obligatoriamente antes de leer datos
    await this.storage.create();
    
    // 4. Cargamos los préstamos viejos
    await this.cargarPrestamosDeIonic();
  }

  // TU FUNCIÓN DE NUEVO PRÉSTAMO
  async abrirFormularioPrestamo() {
    const modal = await this.modalCtrl.create({
      component: NuevoPrestamoPage
    });

    modal.onDidDismiss().then(async (resultado) => {
      if (resultado.data) {
        const nuevo = resultado.data;
        
        const formatoNuevoPrestamo = {
          nombre: nuevo.nombre,
          monto: nuevo.monto,
          detalle: `Plazo: ${nuevo.plazo} meses | Cédula: ${nuevo.cedula}`
        };

        // Metemos el préstamo al inicio del array visual
        this.listaPrestamos.unshift(formatoNuevoPrestamo);

        // 5. Guardamos la nueva lista completa en el Storage de Ionic
        await this.guardarPrestamosEnIonic();
      }
    });

    return await modal.present();
  }

  // ===== NUEVAS FUNCIONES ASÍNCRONAS CON IONIC STORAGE =====

  // Guarda los datos usando la clave 'mis_prestamos'
  async guardarPrestamosEnIonic() {
    // A diferencia de localStorage, aquí no hace falta usar JSON.stringify()
    // Ionic Storage guarda objetos y arreglos directamente de forma nativa
    await this.storage.set('mis_prestamos', this.listaPrestamos);
    console.log('¡Préstamos asegurados con el Storage oficial de Ionic!');
  }

  // Lee los datos guardados en el dispositivo
  async cargarPrestamosDeIonic() {
    const datosGuardados = await this.storage.get('mis_prestamos');
    
    if (datosGuardados) {
      this.listaPrestamos = datosGuardados;
    } else {
      // Si la app está recién instalada, creamos una muestra inicial
      this.listaPrestamos = [
        { nombre: 'Préstamo de Bienvenida', monto: 15000, detalle: 'Aprobado automáticamente' }
      ];
    }
  }

  // FUNCIONES DE ANDRY
  async onRefresh(event: any) {
    await this.cargarPrestamosDeIonic();
    event.target.complete();
  }

  onAccionRapida(tipoAccion: string) {
    console.log('Acción rápida:', tipoAccion);
  }
}

