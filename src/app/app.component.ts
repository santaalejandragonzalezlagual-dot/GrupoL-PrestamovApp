import { Component } from '@angular/core';
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
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
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
    });
  }
}