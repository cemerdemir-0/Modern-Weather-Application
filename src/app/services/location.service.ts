import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { LocationData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  // Kullanıcının mevcut konumunu al
  getCurrentLocation(): Observable<LocationData> {
    if (!navigator.geolocation) {
      return throwError(() => new Error('Geolocation bu tarayıcıda desteklenmiyor'));
    }

    return from(
      new Promise<LocationData>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          (error) => {
            let errorMessage = 'Konum alınamadı';
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = 'Konum izni reddedildi';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = 'Konum bilgisi mevcut değil';
                break;
              case error.TIMEOUT:
                errorMessage = 'Konum alma zaman aşımına uğradı';
                break;
            }
            reject(new Error(errorMessage));
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 dakika cache
          }
        );
      })
    );
  }

  // Koordinatları şehir adına çevir (reverse geocoding)
  reverseGeocode(lat: number, lon: number): Promise<string> {
    // Basit bir yaklaşım - en yakın şehri bul
    const cities = [
      { name: 'İstanbul', lat: 41.0082, lon: 28.9784 },
      { name: 'Ankara', lat: 39.9334, lon: 32.8597 },
      { name: 'İzmir', lat: 38.4192, lon: 27.1287 },
      { name: 'Bursa', lat: 40.1826, lon: 29.0665 },
      { name: 'Antalya', lat: 36.8969, lon: 30.7133 },
      { name: 'Adana', lat: 37.0000, lon: 35.3213 },
      { name: 'Konya', lat: 37.8667, lon: 32.4833 },
      { name: 'Gaziantep', lat: 37.0662, lon: 37.3833 },
      { name: 'Kayseri', lat: 38.7312, lon: 35.4787 },
      { name: 'Trabzon', lat: 41.0015, lon: 39.7178 }
    ];

    let closestCity = cities[0];
    let minDistance = this.calculateDistance(lat, lon, closestCity.lat, closestCity.lon);

    cities.forEach(city => {
      const distance = this.calculateDistance(lat, lon, city.lat, city.lon);
      if (distance < minDistance) {
        minDistance = distance;
        closestCity = city;
      }
    });

    return Promise.resolve(closestCity.name);
  }

  // İki koordinat arasındaki mesafeyi hesapla (Haversine formula)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Dünya'nın yarıçapı (km)
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
}