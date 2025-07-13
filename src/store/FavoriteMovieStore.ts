import { makeAutoObservable, toJS } from 'mobx';

import type { ICurrentMovie } from '../api/types/currentMovie';

class FavoriteMovieStore {
  favorites: ICurrentMovie[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites();
  }

  loadFavorites() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      this.favorites = JSON.parse(saved);
    }
  }

  saveToFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  checkIsMovieInFavorites(id: number) {
    return this.favorites.some((movie) => movie.id === id);
  }

  addFavoriteMovie(movie: ICurrentMovie | null) {
    if (movie && !this.checkIsMovieInFavorites(movie.id)) {
      this.favorites.push(movie);
      this.saveToFavorites();
      console.log(toJS(movie));
    }
  }

  deleteFromFavorites(movieToDelete: ICurrentMovie) {
    this.favorites = this.favorites.filter(
      (movie) => movie.id !== movieToDelete.id
    );
    this.saveToFavorites();

    return this.favorites;
  }

  deleteAllFavorites() {
    localStorage.removeItem('favorites');

    this.favorites = [];
  }
}

export default new FavoriteMovieStore();
