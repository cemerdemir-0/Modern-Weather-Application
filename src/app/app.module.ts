import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { CitySearchComponent } from './components/city-search/city-search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { LocationButtonComponent } from './components/location-button/location-button.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
    ForecastComponent,
    CitySearchComponent,
    FavoritesComponent,
    LocationButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
