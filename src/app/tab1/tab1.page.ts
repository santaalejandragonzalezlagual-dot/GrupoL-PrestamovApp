import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; // <-- 1. Importamos el Storage de Ionic
import { NuevoPrestamoPage } from '../pages/nuevo-prestamo/nuevo-prestamo.page';
import { ApiService } from '../services/api.service';
import { TasaCambio } from '../models/prestamo.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  // ===== TASA DE CAMBIO (real, vía ApiService) =====
  tasaCambio: TasaCambio | null = null;
  cargandoTasa: boolean = true;
  errorTasa: boolean = false;

  // LISTA DE PRÉSTAMOS ANDRY
  listaPrestamos: any[] = [];

  noticias: any[] = [];
  cargandoNoticias: boolean = true;
  errorNoticias: boolean = false;
 
  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private apiService: ApiService,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    // 3. Inicializamos el almacenamiento de Ionic obligatoriamente antes de leer datos
    await this.storage.create();
    
    // 4. Cargamos los préstamos viejos
    await this.cargarPrestamosDeIonic();
    this.cargarTasaCambio();
    this.cargarNoticias();
  }

// ===== TASA DE CAMBIO =====
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
  
cargarNoticias() {
  this.cargandoNoticias = true;
  this.errorNoticias = false;

  this.apiService.getNoticias().subscribe({
    next: (data) => {
      this.noticias = data;
      this.cargandoNoticias = false;
    },
    error: (err) => {
      console.error('Error al obtener noticias:', err);
      this.errorNoticias = true;
      this.cargandoNoticias = false;
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

  // ===== BOTONES SIN PANTALLA PROPIA TODAVÍA =====
  async onAccionRapida(accion: string) {
    const alert = await this.alertCtrl.create({
      header: 'Próximamente',
      message: 'Esta función estará disponible pronto.',
      buttons: ['Entendido']
    });
    await alert.present();
  }
}

