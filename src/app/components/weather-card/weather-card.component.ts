import { Component, Input } from '@angular/core';
import { WeatherData } from '../../models/weather.model';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  standalone: false
})
export class WeatherCardComponent {
  @Input() weatherData: WeatherData | null = null;

  constructor(private weatherService: WeatherService) {}

  getUVIndexLevel(uvIndex: number): string {
    if (uvIndex <= 2) return 'Düşük';
    if (uvIndex <= 5) return 'Orta';
    if (uvIndex <= 7) return 'Yüksek';
    if (uvIndex <= 10) return 'Çok Yüksek';
    return 'Aşırı';
  }

  getUVIndexColor(uvIndex: number): string {
    if (uvIndex <= 2) return '#4CAF50';
    if (uvIndex <= 5) return '#FF9800';
    if (uvIndex <= 7) return '#FF5722';
    if (uvIndex <= 10) return '#E91E63';
    return '#9C27B0';
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('tr-TR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  getAirQualityInfo(aqi: number) {
    return this.weatherService.getAirQualityDescription(aqi);
  }
}