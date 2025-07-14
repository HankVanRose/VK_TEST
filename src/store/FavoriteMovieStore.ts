import { makeAutoObservable } from 'mobx';
import type { ICurrentMovie } from '../types/currentMovie';
import UserStore from './UserStore';

class FavoriteMovieStore {
  private allFavorites: Record<string, ICurrentMovie[]> = {};
  currentUserFavorites: ICurrentMovie[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadAllFavorites();
  }

  private loadAllFavorites() {
    const saved = localStorage.getItem('allFavorites');
    if (saved) {
      this.allFavorites = JSON.parse(saved);
    }
  }

  private saveAllFavorites() {
    localStorage.setItem('allFavorites', JSON.stringify(this.allFavorites));
  }

  initializeUserFavorites(userId: string) {
    if (!this.allFavorites[userId]) {
      this.allFavorites[userId] = [];
      this.saveAllFavorites();
    }
  }

  loadUserFavorites(userId: number) {
    this.currentUserFavorites = this.allFavorites[userId] || [];
  }

  saveCurrentUserFavorites() {
    if (UserStore.currentUser) {
      this.allFavorites[UserStore.currentUser.id] = this.currentUserFavorites;
      this.saveAllFavorites();
    }
  }

  get favorites() {
    return this.currentUserFavorites;
  }

  checkIsMovieInFavorites(id: number) {
    return this.currentUserFavorites.some((movie) => movie.id === id);
  }

  addFavoriteMovie(movie: ICurrentMovie | null) {
    if (!UserStore.currentUser) return;

    if (movie && !this.checkIsMovieInFavorites(movie.id)) {
      this.currentUserFavorites.push(movie);
      this.saveCurrentUserFavorites();
    }
  }

  deleteFromFavorites(movieToDelete: ICurrentMovie) {
    this.currentUserFavorites = this.currentUserFavorites.filter(
      (movie) => movie.id !== movieToDelete.id
    );
    this.saveCurrentUserFavorites();
    return this.currentUserFavorites;
  }

  deleteAllFavorites() {
    if (!UserStore.currentUser) return;

    this.currentUserFavorites = [];
    this.allFavorites[UserStore.currentUser.id] = [];
    this.saveAllFavorites();
  }
}

export default new FavoriteMovieStore();
