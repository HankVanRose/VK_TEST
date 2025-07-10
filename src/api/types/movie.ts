export interface Movie {
  id: number;
  name: string | null;
  alternativeName: string;
  type: string;
  typeNumber: number;
  year: number;
  description: string | null;
  shortDescription: string | null;
  status: string;
  rating: Rating;
  votes: Rating;
  movieLength: number | null;
  totalSeriesLength: number;
  seriesLength?: number | null;
  ratingMpaa?: string | null;
  ageRating?: number | null;
  poster?: Poster;
  genres: Genre[];
  countries: Genre[];
  releaseYears: ReleaseYear[];
  top10?: number | null;
  top250?: number | null;
  isSeries: boolean;
  ticketsOnSale: boolean;
}
export type Movies = Movie[];

export interface ReleaseYear {
  start: number;
  end: number;
}

export interface Genre {
  name: string;
}

export interface Rating {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

export interface Poster {
  previewUrl: string;
  url: string;
}
