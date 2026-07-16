import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  //  para evitar conflictos de tiempo
  constructor(private storage: Storage) { }

  async initStorage() {
    if (this._storage) return; // Si ya está encendida, no hace nada
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async guardar(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  async obtener(key: string): Promise<any> {
    return await this._storage?.get(key);
  }
}
