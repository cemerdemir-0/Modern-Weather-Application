import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { FavoritesService } from './services/favorites.service';
import { WeatherData } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Hava Durumu - Türkiye';
  weatherData: WeatherData | null = null;
  loading = false;
  selectedCity = 'İstanbul';
  currentCoordinates: { lat: number, lon: number } | null = null;
  errorMessage = '';

  constructor(
    private weatherService: WeatherService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadWeatherData(this.selectedCity);
  }

  onCitySelected(cityName: string): void {
    this.selectedCity = cityName;
    this.currentCoordinates = null;
    this.errorMessage = '';
    this.loadWeatherData(cityName);
  }

  onLocationFound(locationData: { lat: number, lon: number, cityName: string }): void {
    this.selectedCity = locationData.cityName;
    this.currentCoordinates = { lat: locationData.lat, lon: locationData.lon };
    this.errorMessage = '';
    this.loadWeatherByCoordinates(locationData.lat, locationData.lon, locationData.cityName);
  }

  onLocationError(error: string): void {
    this.errorMessage = error;
    console.error('Konum hatası:', error);
  }

  private loadWeatherData(cityName: string): void {
    this.loading = true;
    this.weatherService.getWeatherData(cityName).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Hava durumu verileri yüklenirken hata:', error);
        this.loading = false;
      }
    });
  }

  private loadWeatherByCoordinates(lat: number, lon: number, cityName: string): void {
    this.loading = true;
    this.weatherService.getWeatherByCoordinates(lat, lon, cityName).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Hava durumu verileri yüklenirken hata:', error);
        this.loading = false;
      }
    });
  }

  refreshWeather(): void {
    if (this.currentCoordinates) {
      this.loadWeatherByCoordinates(
        this.currentCoordinates.lat, 
        this.currentCoordinates.lon, 
        this.selectedCity
      );
    } else {
      this.loadWeatherData(this.selectedCity);
    }
  }

  toggleFavorite(): void {
    if (this.favoritesService.isFavorite(this.selectedCity)) {
      this.favoritesService.removeFromFavorites(this.selectedCity);
    } else {
      this.favoritesService.addToFavorites(this.selectedCity);
    }
  }

  isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.selectedCity);
  }
}
