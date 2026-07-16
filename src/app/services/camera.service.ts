import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {

  /** Abre la cámara y devuelve la ruta de la foto para usar en un <img>. */
  async tomarFoto(): Promise<string> {
    const foto: Photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    return foto.webPath ?? '';
  }

  /** Abre la galería del dispositivo en vez de la cámara. */
  async elegirDeGaleria(): Promise<string> {
    const foto: Photo = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });
    return foto.webPath ?? '';
  }
}