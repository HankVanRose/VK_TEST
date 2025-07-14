import { makeAutoObservable, runInAction } from 'mobx';
import type { Genre, Movies, MoviesApiResponse } from '../types/movies';
import axios, { type AxiosResponse } from 'axios';

import type { ICurrentMovie, Person, Poster } from '../types/currentMovie';

class MoviesStore {
  movies: Movies = [];
  page = 1;
  isLoading = false;
  moreToLoad = true;
  currentMovie: ICurrentMovie | null = null;
  actors: Person[] = [];
  genres: Genre[] = [];
  filteredMovies: Movies = [];
  posters: Poster[] = [];

  filters = {
    selectedGenres: [] as string[],
    ratingRange: [0, 10] as [number, number],
    yearRange: [1990, new Date().getFullYear()] as [number, number],
    isActive: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  async loadGenres() {
    try {
      this.isLoading = true;
      const response = await axios.get(
        'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name',
        {
          headers: {
            accept: 'application/json',
            'X-API-KEY': 'ВСТАВЬТЕ СВОЙ API KEY',
          },
        }
      );

      const allGenres = response.data;

      runInAction(() => {
        this.genres = allGenres;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  setFiltersFromParams(params: URLSearchParams) {
    const filters = {
      selectedGenres: params.get('genres')?.split(',') || [],
      ratingRange: [
        Number(params.get('ratingMin')) || 0,
        Number(params.get('ratingMax')) || 10,
      ] as [number, number],
      yearRange: [
        Number(params.get('yearMin')) || 1990,
        Number(params.get('yearMax')) || new Date().getFullYear(),
      ] as [number, number],
      isActive: Boolean(
        params.get('genres') ||
          params.get('ratingMin') ||
          params.get('ratingMax') ||
          params.get('yearMin') ||
          params.get('yearMax')
      ),
    };

    runInAction(() => {
      this.filters = filters;
    });
  }

  async loadInitialMovies(params?: URLSearchParams) {
    if (params) {
      this.setFiltersFromParams(params);
    }

    await this.loadMovies();

    runInAction(() => {
      if (this.filters.isActive) {
        this.applyFilters();
      } else {
        this.filteredMovies = [...this.movies];
      }
    });
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
          headers: { 'X-API-KEY': 'ВСТАВЬТЕ СВОЙ API KEY' },
        }
      );
      const allMovies = response.data.docs;

      const { docs, page, pages } = response.data;

      const filmsWithPosters = allMovies.filter((movie) => movie.poster);

      const posters = filmsWithPosters.map((el) => el.poster);

      runInAction(() => {
        this.movies = [...this.movies, ...docs];
        this.page += 1;
        this.moreToLoad = page < pages;
        this.posters = posters.filter((poster) => poster !== undefined);

        if (this.filters.isActive) {
          this.applyFilters();
        } else {
          this.filteredMovies = [...this.movies];
        }
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  applyFilters() {
    this.filteredMovies = this.movies.filter((movie) => {
      const year = movie.year ?? 0;
      const rating = movie.rating?.imdb ?? 0;
      const genreMatch =
        this.filters.selectedGenres.length === 0 ||
        movie.genres?.some((g) => this.filters.selectedGenres.includes(g.name));
      const ratingMatch =
        rating >= this.filters.ratingRange[0] &&
        rating <= this.filters.ratingRange[1];
      const yearMatch =
        year >= this.filters.yearRange[0] && year <= this.filters.yearRange[1];

      return genreMatch && ratingMatch && yearMatch;
    });
  }

  async loadMovieDetails(id: number) {
    try {
      runInAction(() => {
        this.currentMovie = null;
      });

      const response = await axios.get<ICurrentMovie>(
        `https://api.kinopoisk.dev/v1.4/movie/${id}`,
        {
          headers: { 'X-API-KEY': 'ВСТАВЬТЕ СВОЙ API KEY' },
        }
      );
      console.log(response.data);
      runInAction(() => {
        this.currentMovie = response.data;
        this.actors =
          this.currentMovie?.persons?.filter(
            (el) => el.enProfession === 'actor'
          ) || [];
      });
    } catch (error) {
      console.error('Error loading movie details:', error);
    }
  }

  toggleGenre(genreName: string) {
    if (this.filters.selectedGenres.includes(genreName)) {
      this.filters.selectedGenres = this.filters.selectedGenres.filter(
        (g) => g !== genreName
      );
    } else {
      this.filters.selectedGenres.push(genreName);
    }
    this.filters.isActive = true;
    this.applyFilters();
  }

  setRatingRange(range: [number, number]) {
    this.filters.ratingRange = range;
    this.filters.isActive = true;
    this.applyFilters();
  }

  setYearRange(range: [number, number]) {
    this.filters.yearRange = range;
    this.filters.isActive = true;
    this.applyFilters();
  }

  resetFilters() {
    this.filters = {
      selectedGenres: [],
      ratingRange: [0, 10],
      yearRange: [1990, new Date().getFullYear()],
      isActive: false,
    };
    this.filteredMovies = [...this.movies];
  }

  reset() {
    this.movies = [];
    this.filteredMovies = [];
    this.page = 1;
    this.moreToLoad = true;
  }
}

export default new MoviesStore();
