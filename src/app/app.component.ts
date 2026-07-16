import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  notificationsOutline,
  cardOutline,
  documentTextOutline,
  trendingUpOutline,
  calendarOutline,
  businessOutline,
  homeOutline,
  personOutline,
  locationOutline,
  arrowBackOutline,
  checkmarkCircle,
  timeOutline,
  cashOutline,
  alertCircleOutline,
  calculatorOutline,
  shieldCheckmarkOutline, 
  callOutline, 
  mailOutline, 
  starOutline, 
  logOutOutline,
  cameraOutline, 
  imagesOutline, 
  closeOutline,
  cloudOfflineOutline
} from 'ionicons/icons';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  isOnline = true;

  constructor(private networkService: NetworkService) {
    addIcons({
      'notifications-outline': notificationsOutline,
      'card-outline': cardOutline,
      'document-text-outline': documentTextOutline,
      'trending-up-outline': trendingUpOutline,
      'calendar-outline': calendarOutline,
      'business-outline': businessOutline,
      'home-outline': homeOutline,
      'person-outline': personOutline,
      'location-outline': locationOutline,
      'arrow-back-outline': arrowBackOutline,
      'checkmark-circle': checkmarkCircle,
      'time-outline': timeOutline,
      'cash-outline': cashOutline,
      'alert-circle-outline': alertCircleOutline,
      'calculator-outline': calculatorOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'call-outline': callOutline,
      'mail-outline': mailOutline,
      'star-outline': starOutline,
      'log-out-outline': logOutOutline,
      'camera-outline': cameraOutline,
      'images-outline': imagesOutline,
       'close-outline': closeOutline,
    });
  }

  ngOnInit() {
    this.networkService.status$.subscribe(status => {
      this.isOnline = status;
    });
  }
}