import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {

  async getCurrentPosition(): Promise<{ lat: number; lng: number }> {
    const coordenadas = await Geolocation.getCurrentPosition();
    return {
      lat: coordenadas.coords.latitude,
      lng: coordenadas.coords.longitude,
    };
  }
}