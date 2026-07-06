import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export interface CuotaAmortizacion {
  numero: number;
  cuota: number;
  interes: number;
  capital: number;
  balance: number;
}

export interface Prestamo {
  id: string;
  monto: number;
  tasaAnual: number;
  meses: number;
  cuotaMensual: number;
  totalPagar: number;
  fecha: string;
  tabla: CuotaAmortizacion[];
}

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private historial: Prestamo[] = [];

  constructor(private storageService: StorageService) {
    // Llamamos a un método para encender y cargar todo en orden
    this.inicializarServicio();
  }

  // Esto Asegura que la BD esté lista antes de leer los datos
  async inicializarServicio() {
    await this.storageService.initStorage();
    await this.cargarHistorial();
  }

  calcularPrestamo(monto: number, tasaAnual: number, meses: number): Prestamo {
    const tasaMensual = (tasaAnual / 12) / 100;
    const cuotaMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));
    const totalPagar = cuotaMensual * meses;
    
    let balance = monto;
    const tabla: CuotaAmortizacion[] = [];

    for (let i = 1; i <= meses; i++) {
      const interes = balance * tasaMensual;
      const capital = cuotaMensual - interes;
      balance = balance - capital;

      tabla.push({
        numero: i,
        cuota: Number(cuotaMensual.toFixed(2)),
        interes: Number(interes.toFixed(2)),
        capital: Number(capital.toFixed(2)),
        balance: Number(Math.max(0, balance).toFixed(2))
      });
    }

    return {
      id: Date.now().toString(),
      monto,
      tasaAnual,
      meses,
      cuotaMensual: Number(cuotaMensual.toFixed(2)),
      totalPagar: Number(totalPagar.toFixed(2)),
      fecha: new Date().toLocaleDateString(),
      tabla
    };
  }

  async guardarPrestamo(nuevoPrestamo: Prestamo) {
    this.historial.unshift(nuevoPrestamo);
    await this.storageService.guardar('historial_prestamos', this.historial);
  }

  getHistorial(): Prestamo[] {
    return this.historial;
  }

  async cargarHistorial() {
    const datos = await this.storageService.obtener('historial_prestamos');
    if (datos) {
      this.historial = datos;
    }
  }
}
