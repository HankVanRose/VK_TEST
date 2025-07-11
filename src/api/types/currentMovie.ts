export interface ICurrentMovie {
  id: number;
  name: string;
  alternativeName: string;
  enName?: string | null;
  type: string;
  typeNumber: number;
  year: number;
  description: string;
  shortDescription?: string | null;
  slogan?: string | null;
  status?: string | null;
  rating: Rating;
  votes: Rating;
  movieLength: number;
  totalSeriesLength?: string | null;
  seriesLength?: string | null;
  ratingMpaa?: string | null;
  ageRating?: number | null;
  poster: Poster;
  genres: Genre[];
  countries: Genre[];
  persons: Person[];
  fees: Fees;
  premiere: Premiere;
  top10?: number | null;
  top250?: number | null;
  isSeries: boolean;
  audience: Audience[];
  ticketsOnSale: boolean;
  lists: string[] | null;
  watchabilityParsed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Audience {
  count: number;
  country: string;
}

export interface Premiere {
  world: string;
}

export interface Fees {
  world: World;
}

export interface World {
  value: number;
  currency: string;
}

export interface Person {
  id: number;
  photo: string;
  name: string;
  enName: string;
  description?: string | null;
  profession: string;
  enProfession: string;
}

export interface Genre {
  name: string;
}

export interface Poster {
  url: string;
  previewUrl: string;
}

export interface Rating {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

export interface ICurrentMovieApiResponse {
  docs: ICurrentMovie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
