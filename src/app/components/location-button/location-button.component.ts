import { Component, EventEmitter, Output } from '@angular/core';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location-button',
  templateUrl: './location-button.component.html',
  styleUrls: ['./location-button.component.scss'],
  standalone: false
})
export class LocationButtonComponent {
  @Output() locationFound = new EventEmitter<{ lat: number, lon: number, cityName: string }>();
  @Output() locationError = new EventEmitter<string>();
  
  isLoading = false;

  constructor(private locationService: LocationService) {}

  getCurrentLocation(): void {
    this.isLoading = true;
    
    this.locationService.getCurrentLocation().subscribe({
      next: (location) => {
        // Koordinatları şehir adına çevir
        this.locationService.reverseGeocode(location.lat, location.lon)
          .then(cityName => {
            this.locationFound.emit({
              lat: location.lat,
              lon: location.lon,
              cityName: cityName
            });
            this.isLoading = false;
          })
          .catch(error => {
            console.error('Şehir adı bulunamadı:', error);
            this.locationFound.emit({
              lat: location.lat,
              lon: location.lon,
              cityName: 'Mevcut Konum'
            });
            this.isLoading = false;
          });
      },
      error: (error) => {
        console.error('Konum alınamadı:', error);
        this.locationError.emit(error.message);
        this.isLoading = false;
      }
    });
  }
}