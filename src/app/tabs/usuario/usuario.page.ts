import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as L from 'leaflet';
import { CameraService } from '../../services/camera.service';
import { GeolocationService } from '../../services/geolocation.service';
import { NetworkService } from '../../services/network.service';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png',
});

interface Sucursal {
  nombre: string;
  lat: number;
  lng: number;
  distanciaKm?: number;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
  standalone: false,
})
export class UsuarioPage implements OnInit, AfterViewInit, OnDestroy {

  usuario = {
    nombre: 'Grupo L UAPA',
    email: 'grupoL@uapa.edu.do',
    iniciales: 'GL'
  };

  listaPrestamos: any[] = [];
  fotoPerfil: string | null = null;

  // ===== MAPA / SUCURSALES =====
  private map?: L.Map;
  cargandoMapa = true;
  errorUbicacion = '';
  isOnline = true;

  sucursales: Sucursal[] = [
    { nombre: 'Sede Central UAPA', lat: 19.4517, lng: -70.6970 },
    { nombre: 'Sucursal Centro Histórico', lat: 19.4560, lng: -70.7010 },
    { nombre: 'Sucursal Los Jardines', lat: 19.4480, lng: -70.6920 },
  ];

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    private cameraService: CameraService,
    private geoService: GeolocationService,
    private networkService: NetworkService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const datosGuardados = await this.storage.get('mis_prestamos');
    this.listaPrestamos = datosGuardados || [];

    const foto = await this.storage.get('foto_perfil');
    this.fotoPerfil = foto || null;
    
    this.networkService.status$.subscribe(status => {
    this.isOnline = status;
    });
  }

  ngAfterViewInit() {
    this.cargarMapa();
  }

  async cargarMapa() {
    this.cargandoMapa = true;
    this.errorUbicacion = '';

    try {
      const pos = await this.geoService.getCurrentPosition();
      this.cargandoMapa = false;

      this.sucursales.forEach(s => {
        s.distanciaKm = this.calcularDistancia(pos.lat, pos.lng, s.lat, s.lng);
      });
      this.sucursales.sort((a, b) => (a.distanciaKm ?? 0) - (b.distanciaKm ?? 0));

      setTimeout(() => this.initMap(pos.lat, pos.lng), 100);
    } catch (error) {
      this.cargandoMapa = false;
      this.errorUbicacion = 'No se pudo obtener tu ubicación. Verifica que el GPS esté activado.';
      console.error('Error obteniendo ubicación:', error);
    }
  }

  private initMap(lat: number, lng: number) {
    this.map = L.map('mapaSucursales').setView([lat, lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);

    L.marker([lat, lng]).addTo(this.map).bindPopup('Estás aquí').openPopup();

    this.sucursales.forEach(s => {
      L.marker([s.lat, s.lng]).addTo(this.map!).bindPopup(s.nombre);
    });
  }

  private calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  async cambiarFoto() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Foto de perfil',
      buttons: [
        {
          text: 'Tomar foto',
          icon: 'camera-outline',
          handler: () => this.tomarFoto()
        },
        {
          text: 'Elegir de galería',
          icon: 'images-outline',
          handler: () => this.elegirDeGaleria()
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async tomarFoto() {
    try {
      const ruta = await this.cameraService.tomarFoto();
      if (ruta) {
        this.fotoPerfil = ruta;
        await this.storage.set('foto_perfil', ruta);
      }
    } catch (e) {
      console.log('Cámara no disponible o cancelada:', e);
    }
  }

  async elegirDeGaleria() {
    try {
      const ruta = await this.cameraService.elegirDeGaleria();
      if (ruta) {
        this.fotoPerfil = ruta;
        await this.storage.set('foto_perfil', ruta);
      }
    } catch (e) {
      console.log('Galería no disponible o cancelada:', e);
    }
  }

  async proximamente() {
    const alert = await this.alertCtrl.create({
      header: 'Próximamente',
      message: 'Esta función estará disponible pronto.',
      buttons: ['Entendido']
    });
    await alert.present();
  }

  async cerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro que deseas salir?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Cerrar sesión',
          role: 'destructive',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }
  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}