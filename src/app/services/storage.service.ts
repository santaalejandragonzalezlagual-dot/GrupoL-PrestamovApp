import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  // Inicializa la base de datos local
  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guarda un elemento con una llave específica
  async guardar(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  // Obtiene un elemento guardado
  async obtener(key: string): Promise<any> {
    return await this._storage?.get(key);
  }
}
