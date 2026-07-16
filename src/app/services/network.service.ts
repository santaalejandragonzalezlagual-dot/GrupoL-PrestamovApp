import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private onlineStatus = new BehaviorSubject<boolean>(true);
  status$ = this.onlineStatus.asObservable();

  constructor() {
    this.init();
  }

  private async init() {
    const status = await Network.getStatus();
    this.onlineStatus.next(status.connected);

    Network.addListener('networkStatusChange', (status) => {
      this.onlineStatus.next(status.connected);
    });
  }
}