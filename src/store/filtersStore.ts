import { makeAutoObservable, reaction } from "mobx";
 
import { searchParamsToObject } from "./urlUtils";
import type { Genre } from "../api/types/currentMovie";
 

class FiltersStore {
  // Состояние фильтров
  genres: Genre[]  = [];
  selectedGenres: string[] = [];
  ratingRange: [number, number] = [0, 10];
  yearRange: [number, number] = [1990, new Date().getFullYear()];

  constructor() {
    makeAutoObservable(this);
    
    // Инициализация из URL параметров
    this.initFromURL();
    
    // Реакция на изменения фильтров для обновления URL
    reaction(
      () => this.appliedFilters,
      (filters) => {
        this.updateURL(filters);
      },
      { delay: 300 }
    );
  }

  // Инициализация из URL параметров
  initFromURL() {
    const params = new URLSearchParams(window.location.search);
    const filters = searchParamsToObject(params);
    
    if (filters.genres) {
      this.selectedGenres = Array.isArray(filters.genres) 
        ? filters.genres 
        : [filters.genres];
    }
    
    if (filters.ratingMin && filters.ratingMax) {
      this.ratingRange = [
        Number(filters.ratingMin),
        Number(filters.ratingMax)
      ];
    }
    
    if (filters.yearMin && filters.yearMax) {
      this.yearRange = [
        Math.max(1990, Number(filters.yearMin)),
        Math.min(new Date().getFullYear(), Number(filters.yearMax))
      ];
    }
  }

  // Обновление URL с текущими фильтрами
  updateURL(filters: any) {
    const params = new URLSearchParams();
    
    if (filters.genres?.length) {
      filters.genres.forEach((genre: string) => {
        params.append('genre', genre);
      });
    }
    
    if (filters.rating) {
      params.set('ratingMin', filters.rating[0].toString());
      params.set('ratingMax', filters.rating[1].toString());
    }
    
    if (filters.year) {
      params.set('yearMin', filters.year[0].toString());
      params.set('yearMax', filters.year[1].toString());
    }
    
    window.history.pushState(null, '', `?${params.toString()}`);
  }

  // Вычисляемое свойство для примененных фильтров
  get appliedFilters() {
    return {
      genres: this.selectedGenres,
      rating: this.ratingRange,
      year: this.yearRange
    };
  }

  // Действия для изменения фильтров
  setGenres(genres: Genre[]) {
    this.genres = genres;
  }

  toggleGenre(genre: string) {
    if (this.selectedGenres.includes(genre)) {
      this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
    } else {
      this.selectedGenres = [...this.selectedGenres, genre];
    }
  }

  setRatingRange(range: [number, number]) {
    this.ratingRange = range;
  }

  setYearRange(range: [number, number]) {
    this.yearRange = range;
  }

  // Сброс фильтров
  resetFilters() {
    this.selectedGenres = [];
    this.ratingRange = [0, 10];
    this.yearRange = [1990, new Date().getFullYear()];
  }
}

export default new FiltersStore();