import { makeAutoObservable } from 'mobx';

import type { Movie, Movies } from '../api/types/movies';

class FavoriteMovieStore {
  favorites: Movies = [];
  isDialogOpen = false;
  selectedMovie: Movie | null = null;

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

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isInFavorites(id: number) {
    return this.favorites.some((movie) => movie.id === id);
  }

  openConfirmationDialog(movie: Movie) {
    this.selectedMovie = movie;
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.selectedMovie = null;
  }

  addToFavorites() {
    if (this.selectedMovie && !this.isInFavorites(this.selectedMovie.id)) {
      this.favorites.push(this.selectedMovie);
      this.saveFavorites();
    }
    this.closeDialog();
  }
}

export default new FavoriteMovieStore();
