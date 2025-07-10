import { makeAutoObservable, runInAction } from 'mobx';
import type { Movies, MoviesApiResponse } from '../api/types/movie';
import axios, { type AxiosResponse } from 'axios';
import { toJS } from 'mobx';

class MoviesStore {
  movies: Movies = [];
  page = 1;
  isLoading = false;
  moreToLoad = true;

  constructor() {
    makeAutoObservable(this);
  }

  async loadMovies(params = {}) {
    if (this.isLoading || !this.moreToLoad) return;

    this.isLoading = true;

    try {
      const response: AxiosResponse<MoviesApiResponse> = await axios.get(
        'https://api.kinopoisk.dev/v1.4/movie',
        {
          params: {
            limit: 50,
            page: this.page,
            ...params,
          },
          headers: { 'X-API-KEY': '0Q324AJ-BK6MGPA-HC7S89E-M504R5T' },
        }
      );

      const { docs, page, pages } = response.data;
      console.log('docs: ', docs, 'page:', page, 'pages:', pages);
      runInAction(() => {
        this.movies = [...this.movies, ...docs];
        this.page += 1;
        this.moreToLoad = page < pages;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
        console.log(`InStore`, toJS(this.movies.length));
      });
    }
  }

  reset() {
    this.movies = [];
    this.page = 1;
    this.moreToLoad = true;
  }
  cleanup() {
    if (this.movies.length > 100) {
      this.movies = this.movies.slice(-100);
    }
  }
}

export default new MoviesStore();
