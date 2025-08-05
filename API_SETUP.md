# Hava Durumu API Kurulumu

Bu uygulama gerçek hava durumu verilerini almak için OpenWeatherMap API'sini kullanır.

## API Key Alma Adımları

1. **OpenWeatherMap'e Kaydolun**
   - https://openweathermap.org/api adresine gidin
   - "Sign Up" butonuna tıklayın
   - Ücretsiz hesap oluşturun

2. **API Key'inizi Alın**
   - Hesabınıza giriş yapın
   - "API keys" sekmesine gidin
   - Default API key'inizi kopyalayın

3. **API Key'i Projeye Ekleyin**
   - `src/environments/environment.ts` dosyasını açın
   - `YOUR_API_KEY_HERE` yerine API key'inizi yazın
   
   ```typescript
   export const environment = {
     production: false,
     openWeatherApiKey: 'buraya-api-keyinizi-yazin',
     openWeatherApiUrl: 'https://api.openweathermap.org/data/2.5'
   };
   ```

4. **Production için de Ayarlayın**
   - `src/environments/environment.prod.ts` dosyasında da aynı işlemi yapın

## Önemli Notlar

- API key'iniz aktif olması 1-2 saat sürebilir
- Ücretsiz plan günde 1000 çağrı hakkı verir
- API key olmadan uygulama mock (sahte) verilerle çalışır

## Test Etme

Uygulamayı çalıştırdıktan sonra:
- Konsolu kontrol edin
- API key yoksa "mock veriler kullanılıyor" uyarısı görürsünüz
- API key varsa gerçek hava durumu verileri gelir

## Güvenlik

- API key'inizi asla public repository'lerde paylaşmayın
- Production'da environment variables kullanın
- .gitignore dosyasına environment dosyalarını ekleyin (opsiyonel)