import { Component } from '@angular/core';
import { PrestamoService, Prestamo } from '../services/prestamo.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone : false
})
export class Tab2Page {
  // Variables limpias sin tildes para el formulario HTML
  montoPrestamo!: number;
  tasaAnual!: number;
  plazoMeses!: number;

  // Almacena el resultado del cálculo actual
  prestamoCalculado: Prestamo | null = null;

  constructor(
    private prestamoService: PrestamoService,
    private toastCtrl: ToastController
  ) {}

  // Ejecuta la simulación matemática
  hacerSimulacion() {
    if (!this.montoPrestamo || !this.tasaAnual || !this.plazoMeses) {
      this.mostrarMensaje('Por favor, completa todos los campos requeridos.');
      return;
    }

    if (this.montoPrestamo <= 0 || this.tasaAnual <= 0 || this.plazoMeses <= 0) {
      this.mostrarMensaje('Los valores ingresados deben ser mayores a cero.');
      return;
    }

    // Llama al servicio financiero para generar el préstamo
    this.prestamoCalculado = this.prestamoService.calcularPrestamo(
      this.montoPrestamo,
      this.tasaAnual,
      this.plazoMeses
    );
  }

  // Registra el cálculo realizado en la base de datos local
  async guardarSimulacion() {
    if (this.prestamoCalculado) {
      await this.prestamoService.guardarPrestamo(this.prestamoCalculado);
      this.mostrarMensaje('¡Simulación guardada en el Historial con éxito!');
      this.limpiarFormulario();
    }
  }

  // Restablece la vista para un nuevo cálculo
  limpiarFormulario() {
    this.montoPrestamo = null!;
    this.tasaAnual = null!;
    this.plazoMeses = null!;
    this.prestamoCalculado = null;
  }

  // Mensajes flotantes en pantalla para guiar al usuario
  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }
}
