import { Component, Input } from '@angular/core';
import { DailyForecast } from '../../models/weather.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  standalone: false
})
export class ForecastComponent {
  @Input() forecast: DailyForecast[] = [];

  getShortDayName(dayName: string): string {
    const shortNames: { [key: string]: string } = {
      'Pazartesi': 'Pzt',
      'Salı': 'Sal',
      'Çarşamba': 'Çar',
      'Perşembe': 'Per',
      'Cuma': 'Cum',
      'Cumartesi': 'Cmt',
      'Pazar': 'Paz'
    };
    return shortNames[dayName] || dayName;
  }

  isToday(index: number): boolean {
    return index === 0;
  }
}