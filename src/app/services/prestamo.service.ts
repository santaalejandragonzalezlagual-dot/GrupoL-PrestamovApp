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
    this.cargarHistorial();
  }

  // Método matemático para calcular la amortización fija mensual
  calcularPrestamo(monto: number, tasaAnual: number, meses: number): Prestamo {
    const tasaMensual = (tasaAnual / 12) / 100;
    
    // Fórmula del sistema francés: Cuota = [P * r] / [1 - (1+r)^-n]
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

  // Guarda un nuevo préstamo en el almacenamiento local
  async guardarPrestamo(nuevoPrestamo: Prestamo) {
    this.historial.unshift(nuevoPrestamo); // Añade al inicio de la lista
    await this.storageService.guardar('historial_prestamos', this.historial);
  }

  // Devuelve los préstamos que ya tenemos guardados
  getHistorial(): Prestamo[] {
    return this.historial;
  }

  // Lee el almacenamiento al iniciar la app
  async cargarHistorial() {
    const datos = await this.storageService.obtener('historial_prestamos');
    if (datos) {
      this.historial = datos;
    }
  }
}
