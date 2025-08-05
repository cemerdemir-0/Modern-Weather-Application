import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { FavoritesService } from '../../services/favorites.service';
import { TurkishCity } from '../../models/weather.model';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
  standalone: false
})
export class CitySearchComponent implements OnInit, OnDestroy {
  @Output() citySelected = new EventEmitter<string>();
  
  searchTerm: string = '';
  cities: TurkishCity[] = [];
  filteredCities: TurkishCity[] = [];
  showDropdown: boolean = false;
  favorites: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private weatherService: WeatherService,
    private favoritesService: FavoritesService
  ) {
    this.cities = this.weatherService.getTurkishCities();
  }

  ngOnInit(): void {
    this.favoritesService.favorites$
      .pipe(takeUntil(this.destroy$))
      .subscribe(favorites => {
        this.favorites = favorites;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange(): void {
    if (this.searchTerm.length > 0) {
      this.filteredCities = this.cities.filter(city => 
        city.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.showDropdown = this.filteredCities.length > 0;
    } else {
      this.showDropdown = false;
    }
  }

  selectCity(city: TurkishCity): void {
    this.searchTerm = city.name;
    this.showDropdown = false;
    this.citySelected.emit(city.name);
  }

  onFocus(): void {
    if (this.searchTerm.length > 0) {
      this.onSearchChange();
    }
  }

  onBlur(): void {
    // Dropdown'ı biraz gecikmeyle kapat ki tıklama işlemi gerçekleşebilsin
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  toggleFavorite(city: TurkishCity, event: Event): void {
    event.stopPropagation();
    if (this.isFavorite(city.name)) {
      this.favoritesService.removeFromFavorites(city.name);
    } else {
      this.favoritesService.addToFavorites(city.name);
    }
  }

  isFavorite(cityName: string): boolean {
    return this.favorites.includes(cityName);
  }
}