import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FavoritesService } from '../../services/favorites.service';
import { WeatherService } from '../../services/weather.service';
import { TurkishCity } from '../../models/weather.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: false
})
export class FavoritesComponent implements OnInit, OnDestroy {
  @Output() citySelected = new EventEmitter<string>();
  
  favorites: string[] = [];
  favoriteCities: TurkishCity[] = [];
  showFavorites = false;
  private destroy$ = new Subject<void>();

  constructor(
    private favoritesService: FavoritesService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.favoritesService.favorites$
      .pipe(takeUntil(this.destroy$))
      .subscribe(favorites => {
        this.favorites = favorites;
        this.updateFavoriteCities();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateFavoriteCities(): void {
    const allCities = this.weatherService.getTurkishCities();
    this.favoriteCities = this.favoritesService.getFavoriteCities(allCities);
  }

  toggleFavorites(): void {
    this.showFavorites = !this.showFavorites;
  }

  selectCity(cityName: string): void {
    this.citySelected.emit(cityName);
    this.showFavorites = false;
  }

  removeFromFavorites(cityName: string, event: Event): void {
    event.stopPropagation();
    this.favoritesService.removeFromFavorites(cityName);
  }

  clearAllFavorites(): void {
    if (confirm('Tüm favori şehirleri silmek istediğinizden emin misiniz?')) {
      this.favoritesService.clearFavorites();
    }
  }
}