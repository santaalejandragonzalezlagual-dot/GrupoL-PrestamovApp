export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  iniciales: string;
}

export interface PrestamoActivo {
  id: string;
  monto: number;
  cuotasPagadas: number;
  cuotasTotales: number;
  cuotaMensual: number;
  fechaProximaCuota: string;
  estado: 'al-dia' | 'atrasado' | 'completado';
  totalPagado: number;
  saldoRestante: number;
}

export interface SolicitudPrestamo {
  id: string;
  numero: string;
  montoSolicitado: number;
  plazoMeses: number;
  cuotaMensualEstimada: number;
  estado: 'en-revision' | 'aprobado' | 'completado' | 'rechazado';
  fechaSolicitud: string;
}
export interface TasaCambio {
  fecha: string;
  dop: number;
  eur: number;
}
export interface Noticia {
  id: number;
  titulo: string;
 resumen: string;
}