import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WeatherData, DailyForecast, TurkishCity, AirQuality, LocationData } from '../models/weather.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private turkishCities: TurkishCity[] = [
    // Büyük şehirler
    { name: 'İstanbul', lat: 41.0082, lon: 28.9784, region: 'Marmara' },
    { name: 'Ankara', lat: 39.9334, lon: 32.8597, region: 'İç Anadolu' },
    { name: 'İzmir', lat: 38.4192, lon: 27.1287, region: 'Ege' },
    { name: 'Bursa', lat: 40.1826, lon: 29.0665, region: 'Marmara' },
    { name: 'Antalya', lat: 36.8969, lon: 30.7133, region: 'Akdeniz' },
    { name: 'Adana', lat: 37.0000, lon: 35.3213, region: 'Akdeniz' },
    { name: 'Konya', lat: 37.8667, lon: 32.4833, region: 'İç Anadolu' },
    { name: 'Gaziantep', lat: 37.0662, lon: 37.3833, region: 'Güneydoğu Anadolu' },
    { name: 'Kayseri', lat: 38.7312, lon: 35.4787, region: 'İç Anadolu' },
    { name: 'Trabzon', lat: 41.0015, lon: 39.7178, region: 'Karadeniz' },

    // Diğer iller (alfabetik sıra)
    { name: 'Adıyaman', lat: 37.7648, lon: 38.2786, region: 'Güneydoğu Anadolu' },
    { name: 'Afyonkarahisar', lat: 38.7507, lon: 30.5567, region: 'İç Anadolu' },
    { name: 'Ağrı', lat: 39.7191, lon: 43.0503, region: 'Doğu Anadolu' },
    { name: 'Aksaray', lat: 38.3687, lon: 34.0370, region: 'İç Anadolu' },
    { name: 'Amasya', lat: 40.6499, lon: 35.8353, region: 'Karadeniz' },
    { name: 'Ardahan', lat: 41.1105, lon: 42.7022, region: 'Doğu Anadolu' },
    { name: 'Artvin', lat: 41.1828, lon: 41.8183, region: 'Karadeniz' },
    { name: 'Aydın', lat: 37.8560, lon: 27.8416, region: 'Ege' },
    { name: 'Balıkesir', lat: 39.6484, lon: 27.8826, region: 'Marmara' },
    { name: 'Bartın', lat: 41.5811, lon: 32.4610, region: 'Karadeniz' },
    { name: 'Batman', lat: 37.8812, lon: 41.1351, region: 'Güneydoğu Anadolu' },
    { name: 'Bayburt', lat: 40.2552, lon: 40.2249, region: 'Karadeniz' },
    { name: 'Bilecik', lat: 40.0567, lon: 30.0665, region: 'Marmara' },
    { name: 'Bingöl', lat: 38.8854, lon: 40.7696, region: 'Doğu Anadolu' },
    { name: 'Bitlis', lat: 38.3938, lon: 42.1232, region: 'Doğu Anadolu' },
    { name: 'Bolu', lat: 40.5760, lon: 31.5788, region: 'Karadeniz' },
    { name: 'Burdur', lat: 37.4613, lon: 30.0665, region: 'Akdeniz' },
    { name: 'Çanakkale', lat: 40.1553, lon: 26.4142, region: 'Marmara' },
    { name: 'Çankırı', lat: 40.6013, lon: 33.6134, region: 'İç Anadolu' },
    { name: 'Çorum', lat: 40.5506, lon: 34.9556, region: 'Karadeniz' },
    { name: 'Denizli', lat: 37.7765, lon: 29.0864, region: 'Ege' },
    { name: 'Diyarbakır', lat: 37.9144, lon: 40.2306, region: 'Güneydoğu Anadolu' },
    { name: 'Düzce', lat: 40.8438, lon: 31.1565, region: 'Karadeniz' },
    { name: 'Edirne', lat: 41.6818, lon: 26.5623, region: 'Marmara' },
    { name: 'Elazığ', lat: 38.6810, lon: 39.2264, region: 'Doğu Anadolu' },
    { name: 'Erzincan', lat: 39.7500, lon: 39.5000, region: 'Doğu Anadolu' },
    { name: 'Erzurum', lat: 39.9000, lon: 41.2700, region: 'Doğu Anadolu' },
    { name: 'Eskişehir', lat: 39.7767, lon: 30.5206, region: 'İç Anadolu' },
    { name: 'Giresun', lat: 40.9128, lon: 38.3895, region: 'Karadeniz' },
    { name: 'Gümüşhane', lat: 40.4386, lon: 39.5086, region: 'Karadeniz' },
    { name: 'Hakkari', lat: 37.5744, lon: 43.7408, region: 'Doğu Anadolu' },
    { name: 'Hatay', lat: 36.4018, lon: 36.3498, region: 'Akdeniz' },
    { name: 'Iğdır', lat: 39.8880, lon: 44.0048, region: 'Doğu Anadolu' },
    { name: 'Isparta', lat: 37.7648, lon: 30.5566, region: 'Akdeniz' },
    { name: 'Kahramanmaraş', lat: 37.5858, lon: 36.9371, region: 'Akdeniz' },
    { name: 'Karabük', lat: 41.2061, lon: 32.6204, region: 'Karadeniz' },
    { name: 'Karaman', lat: 37.1759, lon: 33.2287, region: 'İç Anadolu' },
    { name: 'Kars', lat: 40.6167, lon: 43.1000, region: 'Doğu Anadolu' },
    { name: 'Kastamonu', lat: 41.3887, lon: 33.7827, region: 'Karadeniz' },
    { name: 'Kırıkkale', lat: 39.8468, lon: 33.5153, region: 'İç Anadolu' },
    { name: 'Kırklareli', lat: 41.7333, lon: 27.2167, region: 'Marmara' },
    { name: 'Kırşehir', lat: 39.1425, lon: 34.1709, region: 'İç Anadolu' },
    { name: 'Kilis', lat: 36.7184, lon: 37.1212, region: 'Güneydoğu Anadolu' },
    { name: 'Kocaeli', lat: 40.8533, lon: 29.8815, region: 'Marmara' },
    { name: 'Kütahya', lat: 39.4167, lon: 29.9833, region: 'Ege' },
    { name: 'Malatya', lat: 38.3552, lon: 38.3095, region: 'Doğu Anadolu' },
    { name: 'Manisa', lat: 38.6191, lon: 27.4289, region: 'Ege' },
    { name: 'Mardin', lat: 37.3212, lon: 40.7245, region: 'Güneydoğu Anadolu' },
    { name: 'Mersin', lat: 36.8000, lon: 34.6333, region: 'Akdeniz' },
    { name: 'Muğla', lat: 37.2153, lon: 28.3636, region: 'Ege' },
    { name: 'Muş', lat: 38.9462, lon: 41.7539, region: 'Doğu Anadolu' },
    { name: 'Nevşehir', lat: 38.6939, lon: 34.6857, region: 'İç Anadolu' },
    { name: 'Niğde', lat: 37.9667, lon: 34.6833, region: 'İç Anadolu' },
    { name: 'Ordu', lat: 40.9839, lon: 37.8764, region: 'Karadeniz' },
    { name: 'Osmaniye', lat: 37.2130, lon: 36.1763, region: 'Akdeniz' },
    { name: 'Rize', lat: 41.0201, lon: 40.5234, region: 'Karadeniz' },
    { name: 'Sakarya', lat: 40.6940, lon: 30.4358, region: 'Marmara' },
    { name: 'Samsun', lat: 41.2928, lon: 36.3313, region: 'Karadeniz' },
    { name: 'Siirt', lat: 37.9333, lon: 41.9500, region: 'Güneydoğu Anadolu' },
    { name: 'Sinop', lat: 42.0231, lon: 35.1531, region: 'Karadeniz' },
    { name: 'Sivas', lat: 39.7477, lon: 37.0179, region: 'İç Anadolu' },
    { name: 'Şanlıurfa', lat: 37.1591, lon: 38.7969, region: 'Güneydoğu Anadolu' },
    { name: 'Şırnak', lat: 37.4187, lon: 42.4918, region: 'Güneydoğu Anadolu' },
    { name: 'Tekirdağ', lat: 40.9833, lon: 27.5167, region: 'Marmara' },
    { name: 'Tokat', lat: 40.3167, lon: 36.5500, region: 'Karadeniz' },
    { name: 'Tunceli', lat: 39.3074, lon: 39.4388, region: 'Doğu Anadolu' },
    { name: 'Uşak', lat: 38.6823, lon: 29.4082, region: 'Ege' },
    { name: 'Van', lat: 38.4891, lon: 43.4089, region: 'Doğu Anadolu' },
    { name: 'Yalova', lat: 40.6500, lon: 29.2667, region: 'Marmara' },
    { name: 'Yozgat', lat: 39.8181, lon: 34.8147, region: 'İç Anadolu' },
    { name: 'Zonguldak', lat: 41.4564, lon: 31.7987, region: 'Karadeniz' }
  ];

  private apiKey = environment.openWeatherApiKey;
  private apiUrl = environment.openWeatherApiUrl;

  constructor(private http: HttpClient) { }

  getTurkishCities(): TurkishCity[] {
    return this.turkishCities;
  }

  // Gerçek hava durumu verilerini OpenWeatherMap API'den çek
  getWeatherData(cityName: string): Observable<WeatherData> {
    const city = this.turkishCities.find(c => c.name === cityName);

    if (!city) {
      return this.getMockWeatherData(cityName);
    }

    return this.getWeatherByCoordinates(city.lat, city.lon, cityName);
  }

  // Koordinatlara göre hava durumu al
  getWeatherByCoordinates(lat: number, lon: number, cityName?: string): Observable<WeatherData> {
    // API key kontrolü
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY_HERE') {
      console.warn('OpenWeatherMap API key bulunamadı, mock veriler kullanılıyor.');
      return this.getMockWeatherData(cityName || 'Bilinmeyen Konum');
    }

    // Mevcut hava durumu, tahmin, UV ve hava kalitesi için paralel çağrılar
    const currentWeather$ = this.http.get<any>(
      `${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=tr`
    );

    const forecast$ = this.http.get<any>(
      `${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=tr`
    );

    const uv$ = this.http.get<any>(
      `${this.apiUrl}/uvi?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
    );

    const airQuality$ = this.http.get<any>(
      `${this.apiUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
    );

    return forkJoin([currentWeather$, forecast$, uv$, airQuality$]).pipe(
      map(([current, forecast, uv, airQuality]) => {
        console.log('✅ GERÇEK VERİLER KULLANILIYOR!');
        console.log('Şehir:', current.name);
        console.log('Sıcaklık:', current.main.temp + '°C');
        console.log('Durum:', current.weather[0].description);
        console.log('Hava Kalitesi AQI:', airQuality.list[0]?.main?.aqi);
        return this.transformApiData(current, forecast, uv, airQuality, { lat, lon });
      }),
      catchError(error => {
        console.error('❌ API çağrısında hata, mock veriler kullanılıyor:', error);
        return this.getMockWeatherData(cityName || 'Bilinmeyen Konum');
      })
    );
  }

  // Mock data fallback
  private getMockWeatherData(cityName: string): Observable<WeatherData> {
    console.log('⚠️ MOCK VERİLER KULLANILIYOR - API key kontrol edin!');
    const description = this.getRandomWeatherDescription();
    const mockData: WeatherData = {
      location: cityName,
      temperature: Math.floor(Math.random() * 30) + 5,
      description: description,
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      pressure: Math.floor(Math.random() * 50) + 1000,
      visibility: Math.floor(Math.random() * 5) + 5,
      uvIndex: Math.floor(Math.random() * 10) + 1,
      feelsLike: Math.floor(Math.random() * 30) + 5,
      icon: this.getWeatherIconForDescription(description),
      forecast: this.generateMockForecast()
    };

    return of(mockData);
  }

  // API verilerini uygulama formatına dönüştür
  private transformApiData(current: any, forecast: any, uv: any, airQuality?: any, coordinates?: { lat: number, lon: number }): WeatherData {
    const description = this.capitalizeFirst(current.weather[0].description);
    return {
      location: current.name,
      temperature: Math.round(current.main.temp),
      description: description,
      humidity: current.main.humidity,
      windSpeed: Math.round(current.wind.speed * 3.6), // m/s'den km/h'ye
      pressure: current.main.pressure,
      visibility: Math.round((current.visibility || 10000) / 1000), // metre'den km'ye
      uvIndex: Math.round(uv.value || 0),
      feelsLike: Math.round(current.main.feels_like),
      icon: this.getWeatherIconFromCode(current.weather[0].icon, description),
      forecast: this.transformForecastData(forecast.list),
      airQuality: airQuality ? this.transformAirQualityData(airQuality) : undefined,
      coordinates: coordinates
    };
  }

  // Hava kalitesi verilerini dönüştür
  private transformAirQualityData(airQualityResponse: any): AirQuality | undefined {
    const data = airQualityResponse.list?.[0];
    if (!data) return undefined;

    return {
      aqi: data.main.aqi,
      co: Math.round(data.components.co),
      no: Math.round(data.components.no),
      no2: Math.round(data.components.no2),
      o3: Math.round(data.components.o3),
      so2: Math.round(data.components.so2),
      pm2_5: Math.round(data.components.pm2_5),
      pm10: Math.round(data.components.pm10),
      nh3: Math.round(data.components.nh3)
    };
  }

  // AQI seviyesine göre açıklama al (WHO/EPA standartları)
  getAirQualityDescription(aqi: number): { level: string, description: string, color: string, advice?: string } {
    switch (aqi) {
      case 1:
        return {
          level: 'İyi',
          description: 'Hava kalitesi mükemmel',
          color: '#10b981',
          advice: 'Tüm aktiviteler için ideal hava kalitesi'
        };
      case 2:
        return {
          level: 'Orta',
          description: 'Hava kalitesi kabul edilebilir',
          color: '#f59e0b',
          advice: 'Genel olarak güvenli, çok hassas kişiler dikkatli olmalı'
        };
      case 3:
        return {
          level: 'Orta Kötü',
          description: 'Hassas kişiler etkilenebilir',
          color: '#f97316',
          advice: 'Astım, kalp hastalığı olanlar ve çocuklar dikkatli olmalı'
        };
      case 4:
        return {
          level: 'Kötü',
          description: 'Sağlık için zararlı',
          color: '#ef4444',
          advice: 'Dış mekan aktivitelerini sınırlayın, maske kullanın'
        };
      case 5:
        return {
          level: 'Çok Kötü',
          description: 'Tüm nüfus için tehlikeli',
          color: '#991b1b',
          advice: 'Dışarı çıkmayın, pencerelerinizi kapalı tutun'
        };
      default:
        return {
          level: 'Bilinmiyor',
          description: 'Veri mevcut değil',
          color: '#6b7280'
        };
    }
  }

  // 5 günlük tahmin verilerini dönüştür
  private transformForecastData(forecastList: any[]): DailyForecast[] {
    const dailyData: { [key: string]: any[] } = {};

    // Verileri günlere göre grupla
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = [];
      }
      dailyData[dateKey].push(item);
    });

    // Her gün için ortalama değerleri hesapla
    const forecast: DailyForecast[] = [];
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

    Object.keys(dailyData).slice(0, 7).forEach(dateKey => {
      const dayData = dailyData[dateKey];
      const date = new Date(dateKey);

      const temps = dayData.map(d => d.main.temp);
      const maxTemp = Math.round(Math.max(...temps));
      const minTemp = Math.round(Math.min(...temps));

      // Gün ortası verilerini al (en yakın 12:00)
      const noonData = dayData.reduce((prev, curr) => {
        const prevHour = new Date(prev.dt * 1000).getHours();
        const currHour = new Date(curr.dt * 1000).getHours();
        return Math.abs(currHour - 12) < Math.abs(prevHour - 12) ? curr : prev;
      });

      const forecastDescription = this.capitalizeFirst(noonData.weather[0].description);
      forecast.push({
        date: date.toLocaleDateString('tr-TR'),
        dayName: days[date.getDay()],
        maxTemp,
        minTemp,
        description: forecastDescription,
        icon: this.getWeatherIconFromCode(noonData.weather[0].icon, forecastDescription),
        humidity: noonData.main.humidity,
        windSpeed: Math.round(noonData.wind.speed * 3.6)
      });
    });

    return forecast;
  }

  // OpenWeatherMap icon kodunu modern emoji'ye dönüştür
  private getWeatherIconFromCode(iconCode: string, description?: string): string {
    // Modern ve minimalist icon mapping
    const iconMap: { [key: string]: string } = {
      // Clear sky - Açık hava
      '01d': '☀️',  // Güneşli gündüz
      '01n': '🌙',  // Açık gece

      // Few clouds - Az bulutlu
      '02d': '🌤️',  // Güneşli az bulutlu
      '02n': '☁️',  // Gece az bulutlu

      // Scattered clouds - Parçalı bulutlu
      '03d': '⛅',  // Parçalı bulutlu gündüz
      '03n': '☁️',  // Parçalı bulutlu gece

      // Broken clouds - Çok bulutlu
      '04d': '☁️',  // Bulutlu
      '04n': '☁️',  // Gece bulutlu

      // Shower rain - Sağanak yağmur
      '09d': '🌧️',  // Sağanak gündüz
      '09n': '🌧️',  // Sağanak gece

      // Rain - Yağmur
      '10d': '🌧️',  // Yağmurlu gündüz
      '10n': '🌧️',  // Yağmurlu gece

      // Thunderstorm - Fırtına
      '11d': '⛈️',  // Gök gürültülü fırtına
      '11n': '⛈️',  // Gece fırtınası

      // Snow - Kar
      '13d': '🌨️',  // Kar yağışı
      '13n': '🌨️',  // Gece kar yağışı

      // Mist/Fog - Sis/Pus
      '50d': '🌫️',  // Sisli
      '50n': '🌫️'   // Gece sisli
    };

    // Açıklama bazlı ek emoji seçimi - daha minimalist
    if (description) {
      const desc = description.toLowerCase();

      // Yağmur türleri
      if (desc.includes('hafif yağmur') || desc.includes('light rain')) {
        return '🌧️';
      }
      if (desc.includes('orta yağmur') || desc.includes('moderate rain')) {
        return '🌧️';
      }
      if (desc.includes('şiddetli yağmur') || desc.includes('heavy rain')) {
        return '🌧️';
      }
      if (desc.includes('sağanak') || desc.includes('shower')) {
        return '🌧️';
      }

      // Kar türleri
      if (desc.includes('hafif kar') || desc.includes('light snow')) {
        return '🌨️';
      }
      if (desc.includes('kar fırtınası') || desc.includes('blizzard')) {
        return '🌨️';
      }

      // Fırtına türleri
      if (desc.includes('gök gürültüsü') || desc.includes('thunder')) {
        return '⛈️';
      }
      if (desc.includes('şimşek') || desc.includes('lightning')) {
        return '⛈️';
      }

      // Sis türleri
      if (desc.includes('pus') || desc.includes('haze')) {
        return '🌫️';
      }
      if (desc.includes('duman') || desc.includes('smoke')) {
        return '🌫️';
      }

      // Rüzgar
      if (desc.includes('rüzgarlı') || desc.includes('windy')) {
        return '🌬️';
      }
    }

    return iconMap[iconCode] || '☀️';
  }

  // İlk harfi büyük yap
  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private getRandomWeatherDescription(): string {
    const weatherTypes = [
      'Güneşli',
      'Parçalı Bulutlu',
      'Bulutlu',
      'Yağmurlu',
      'Kar Yağışlı',
      'Sisli',
      'Fırtınalı',
      'Açık',
      'Rüzgarlı'
    ];
    return weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
  }

  private getWeatherIconForDescription(description: string): string {
    const weatherMap: { [key: string]: string } = {
      'Güneşli': '☀️',
      'Parçalı Bulutlu': '⛅',
      'Bulutlu': '☁️',
      'Yağmurlu': '🌧️',
      'Kar Yağışlı': '🌨️',
      'Sisli': '🌫️',
      'Fırtınalı': '⛈️',
      'Açık': '🌤️',
      'Rüzgarlı': '🌬️'
    };
    return weatherMap[description] || '☀️';
  }

  private generateMockForecast(): DailyForecast[] {
    const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const forecast: DailyForecast[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const description = this.getRandomWeatherDescription();

      forecast.push({
        date: date.toLocaleDateString('tr-TR'),
        dayName: days[date.getDay()],
        maxTemp: Math.floor(Math.random() * 25) + 10,
        minTemp: Math.floor(Math.random() * 15) + 0,
        description: description,
        icon: this.getWeatherIconForDescription(description),
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5
      });
    }

    return forecast;
  }
}