# 🌤️ Turkish Weather App

A modern, responsive weather application built with Angular 19, featuring real-time weather data for all 81 Turkish cities with premium UI/UX design.

## ✨ Features

### 🎯 Core Features
- **Real-time Weather Data** - Live weather information from OpenWeatherMap API
- **81 Turkish Cities** - Complete coverage of all Turkish provinces
- **7-Day Forecast** - Detailed weekly weather predictions
- **Air Quality Index** - PM2.5, PM10, O₃, NO₂ levels with health recommendations
- **UV Index** - Sun protection guidance

### 🚀 Advanced Features
- **GPS Location Detection** - Automatic current location weather
- **Favorites System** - Save and manage favorite cities
- **Smart Search** - Instant city search with autocomplete
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Premium UI/UX** - Modern glassmorphism design inspired by Zara's aesthetic

### 🌍 Localization
- **Turkish Interface** - Fully localized for Turkish users
- **Turkish Weather Descriptions** - Native weather condition descriptions
- **Regional Information** - Cities grouped by Turkish geographical regions

## 🛠️ Tech Stack

- **Frontend**: Angular 19
- **Styling**: SCSS with modern CSS Grid/Flexbox
- **Icons**: Material Icons
- **API**: OpenWeatherMap API
- **Storage**: LocalStorage for favorites
- **Geolocation**: HTML5 Geolocation API

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Angular CLI 19+
- OpenWeatherMap API key (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/turkish-weather-app.git
   cd turkish-weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for free account
   - Get your API key

4. **Configure API Key**
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     openWeatherApiKey: 'YOUR_API_KEY_HERE',
     openWeatherApiUrl: 'https://api.openweathermap.org/data/2.5'
   };
   ```

5. **Run the application**
   ```bash
   ng serve
   ```

6. **Open browser**
   Navigate to `http://localhost:4200`

## 📱 Screenshots

### Desktop View
- Clean, modern interface with glassmorphism effects
- 6-column weather details grid
- Integrated search with location and favorites

### Mobile View
- Fully responsive design
- Touch-friendly controls
- Optimized layout for small screens

## 🌟 Key Components

### Weather Card
- Current temperature and conditions
- Feels-like temperature
- 6 detailed metrics (humidity, wind, pressure, visibility, UV, air quality)
- Air quality health recommendations

### Search System
- Real-time city search
- GPS location detection
- Favorites management
- Regional categorization

### 7-Day Forecast
- Daily temperature ranges
- Weather condition icons
- Humidity and wind speed
- Interactive temperature bars

## 🎨 Design Philosophy

The app follows a **premium, minimalist design** approach:
- **Glassmorphism effects** for modern aesthetics
- **Subtle animations** for smooth interactions
- **Consistent spacing** and typography
- **Accessible color scheme** with proper contrast
- **Mobile-first responsive** design

## 🔧 Configuration

### Environment Variables
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  openWeatherApiKey: 'your-api-key',
  openWeatherApiUrl: 'https://api.openweathermap.org/data/2.5'
};
```

### Supported Cities
All 81 Turkish provinces with accurate coordinates:
- Major cities: Istanbul, Ankara, Izmir, Bursa, Antalya
- All provinces: From Adana to Zonguldak
- Regional grouping: Marmara, Ege, Akdeniz, etc.

## 📊 API Integration

### OpenWeatherMap Endpoints
- **Current Weather**: `/weather`
- **5-Day Forecast**: `/forecast`
- **UV Index**: `/uvi`
- **Air Pollution**: `/air_pollution`

### Data Processing
- Temperature unit conversion (Kelvin to Celsius)
- Wind speed conversion (m/s to km/h)
- Weather condition translations to Turkish
- Air quality index interpretation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** for weather data API
- **Material Design** for icon system
- **Angular Team** for the amazing framework
- **Turkish Meteorology Service** for regional insights

## 📞 Contact

- **Developer**: [Your Name]
- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn]
- **Portfolio**: [Your Portfolio]

---

⭐ **Star this repository if you found it helpful!**

🐛 **Found a bug?** [Open an issue](https://github.com/yourusername/turkish-weather-app/issues)

💡 **Have a suggestion?** [Start a discussion](https://github.com/yourusername/turkish-weather-app/discussions)
