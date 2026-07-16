import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Usuario, TasaCambio } from '../models/prestamo.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl = 'https://api.prestamov.com';
  private useMocks = true;

  constructor(private http: HttpClient) {}

  // ===== LOGIN (simulado) =====
  login(email: string, password: string): Observable<{ token: string; usuario: Usuario }> {
    if (this.useMocks) {
      return of({
        token: 'mock-jwt-token-12345',
        usuario: {
          id: '1',
          nombre: 'Grupo L UAPA',
          email: email,
          iniciales: 'GL'
        }
      }).pipe(delay(800));
    }
    return this.http.post<{ token: string; usuario: Usuario }>(
      `${this.baseUrl}/auth/login`,
      { email, password }
    );
  }

  // TASA DE CAMBIO (API REST real)
  getTasaCambio(): Observable<TasaCambio> {
    return this.http
      .get<any>('https://latest.currency-api.pages.dev/v1/currencies/usd.json')
      .pipe(
        map(respuesta => ({
          fecha: respuesta.date,
          dop: respuesta.usd.dop,
          eur: respuesta.usd.eur
        }))
      );
  }
}