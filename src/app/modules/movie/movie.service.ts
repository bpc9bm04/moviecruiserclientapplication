import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { Movie } from './movie';
import { Observable } from 'rxjs/Observable';
import { retry } from 'rxjs/operators';
@Injectable()
export class MovieService {

  tmdbEndPoint: string;
  imagePrifix: string;
  apiKey: string;
  watchlistEndPoint: string;
  search: string;

  constructor(private http: HttpClient) {
    this.tmdbEndPoint = 'https://api.themoviedb.org/3/movie';
    this.search = 'https://api.themoviedb.org/3/search/movie?';
    this.apiKey = 'api_key=b976fce09e09b8cc2833c04a6f0d7003';
    this.watchlistEndPoint = "http://localhost:8080/api/movie";
    //this.imagePrifix='https://image.tmdb.org/t/p/w500';
  }
  addMovieToWatchlist(movie: Movie) {
    return this.http.post(this.watchlistEndPoint, movie);
  }
  deleteMovieFromWatchlist(movie: Movie) {
    const url = `${this.watchlistEndPoint}/${movie.id}`;
    return this.http.delete(url, { responseType: 'text' });
  }
  updateMovieComments(movie: Movie) {
    const url = `${this.watchlistEndPoint}/${movie.id}`;
    return this.http.put(url, movie);
  }
  getWatchListedMovies(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(this.watchlistEndPoint);
  }
  getMovies(type: string, page: number = 1): Observable<Array<Movie>> {
    const moviesEndPoints = `${this.tmdbEndPoint}/${type}?${this.apiKey}&page=${page}`;
    return this.http.get(moviesEndPoints).pipe(
      retry(3),
      map(this.pickMovieResults),
      map(this.transformPosterPath).bind(this)
    );
  }
  searchMovies(searchKey: string): Observable<Array<Movie>> {
    if (searchKey.length > 0) {
      const searchMoviesEndPoints = `${this.search}${this.apiKey}&language=en-US&page=1&include_adult=false&query=${searchKey}`;
      return this.http.get(searchMoviesEndPoints).pipe(
        retry(3),
        map(this.pickMovieResults),
        map(this.transformPosterPath).bind(this)
      );
    }
  }
  transformPosterPath(movies): Array<Movie> {
    this.imagePrifix = 'https://image.tmdb.org/t/p/w500';
    return movies.map((movie) => {
      movie.poster_path = `${this.imagePrifix}${movie.poster_path}`;
      return movie;
    });
  }
  pickMovieResults(response) {
    return response['results'];
  }
}
