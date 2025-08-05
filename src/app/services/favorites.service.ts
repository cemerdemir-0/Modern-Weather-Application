import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TurkishCity } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'weather-favorites';
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  
  public favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  // Favori şehirleri localStorage'dan yükle
  private loadFavorites(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const favorites = stored ? JSON.parse(stored) : [];
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Favoriler yüklenirken hata:', error);
      this.favoritesSubject.next([]);
    }
  }

  // Favori şehirleri localStorage'a kaydet
  private saveFavorites(favorites: string[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Favoriler kaydedilirken hata:', error);
    }
  }

  // Şehri favorilere ekle
  addToFavorites(cityName: string): void {
    const currentFavorites = this.favoritesSubject.value;
    if (!currentFavorites.includes(cityName)) {
      const newFavorites = [...currentFavorites, cityName];
      this.saveFavorites(newFavorites);
    }
  }

  // Şehri favorilerden çıkar
  removeFromFavorites(cityName: string): void {
    const currentFavorites = this.favoritesSubject.value;
    const newFavorites = currentFavorites.filter(city => city !== cityName);
    this.saveFavorites(newFavorites);
  }

  // Şehrin favori olup olmadığını kontrol et
  isFavorite(cityName: string): boolean {
    return this.favoritesSubject.value.includes(cityName);
  }

  // Tüm favori şehirleri al
  getFavorites(): string[] {
    return this.favoritesSubject.value;
  }

  // Favori şehirleri TurkishCity objelerine dönüştür
  getFavoriteCities(allCities: TurkishCity[]): TurkishCity[] {
    const favoriteNames = this.getFavorites();
    return allCities.filter(city => favoriteNames.includes(city.name));
  }

  // Favorileri temizle
  clearFavorites(): void {
    this.saveFavorites([]);
  }
}