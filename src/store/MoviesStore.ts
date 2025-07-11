import { makeAutoObservable, runInAction } from 'mobx';
import type { Movie, Movies, MoviesApiResponse } from '../api/types/movies';
import axios, { type AxiosResponse } from 'axios';
import { toJS } from 'mobx';
import type {
  ICurrentMovie,
  ICurrentMovieApiResponse,
} from '../api/types/currentMovie';

class MoviesStore {
  movies: Movies = [];
  page = 1;
  isLoading = false;
  moreToLoad = true;
  currentMovie: ICurrentMovie | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadMovies(params = {}) {
    if (this.isLoading || !this.moreToLoad) return;

    this.isLoading = true;

    try {
      // const response: AxiosResponse<MoviesApiResponse> = await axios.get(
      //   'https://api.kinopoisk.dev/v1.4/movie',

      //   {
      //     params: {
      //       limit: 50,
      //       page: this.page,
      //       ...params,
      //     },
      //     headers: { 'X-API-KEY': '0Q324AJ-BK6MGPA-HC7S89E-M504R5T' },
      //   }
      // );

      const response = await axios.get<MoviesApiResponse>('../.././data.json');
      const allMovies = response.data.docs;

      // Эмулируем пагинацию на клиенте
      const start = (this.page - 1) * 5;
      const end = start + 5;
      const docs = allMovies.slice(start, end);
      // const { docs, page, pages } = response.data;

      runInAction(() => {
        this.movies = [...this.movies, ...docs];
        this.page += 1;
        this.moreToLoad = start < allMovies.length;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
        console.log(`InStore`, toJS(this.movies.length));
      });
    }
  }

  async loadMovieDetails(id: number) {
    try {
      runInAction(() => {
        this.currentMovie = null;
      });
      const response = await axios.get<ICurrentMovieApiResponse>(
        `../.././secondFilm.json`,
        {
          // headers: { 'X-API-KEY': '0Q324AJ-BK6MGPA-HC7S89E-M504R5T' },
        }
      );
      const foundMovie = response.data.docs.find((el) => el.id === id);
      runInAction(() => {
        this.currentMovie = foundMovie || null;
        console.log(toJS(this.currentMovie));
      });
    } catch (error) {
      console.error('Failed to load movie details:', error);
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
