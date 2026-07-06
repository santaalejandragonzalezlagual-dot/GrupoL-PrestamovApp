import { Component, OnInit } from '@angular/core';
import { PrestamoService, Prestamo } from '../services/prestamo.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone : false
})
export class Tab3Page implements OnInit {
  // Arreglo local para guardar las simulaciones obtenidas
  historialPrestamos: Prestamo[] = [];

  constructor(private prestamoService: PrestamoService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  // Evento nativo de Ionic que se ejecuta cada vez que la pestaña se vuelve visible
  ionViewWillEnter() {
    this.cargarDatos();
  }

  // Consulta el listado actualizado desde el servicio
  cargarDatos() {
    this.historialPrestamos = this.prestamoService.getHistorial();
  }
}
