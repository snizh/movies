import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

import { movies } from './movie.mock-data';
import { MovieDigest, MovieDetails } from './movie.model';

const movieList: MovieDigest[] = movies.map(elem => ({
  id: elem.id,
  name: elem.name,
  rate: elem.rate,
  genres: elem.genres.join(', '),
}));

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  moviesSubject: Subject<MovieDigest[]>;

  constructor() { }

  getMovies(): Observable<MovieDigest[]> {
    if (!this.moviesSubject) {
      this.moviesSubject = new BehaviorSubject<MovieDigest[]>(movieList);
    }
    return this.moviesSubject.asObservable();
  }

  search(pattern: string = ''): void {
    this.moviesSubject.next(this.getFilteredMovieList(pattern));
  }

  getMovie(movieId: number): Observable<MovieDetails> {
    return of<MovieDetails>(movies.filter(elem => elem.id === movieId)[0]);
  }

  private getFilteredMovieList(pattern: string): MovieDigest[] {
    return movieList.filter(elem => elem.name.toLowerCase().includes(pattern.toLowerCase()));
  }
}
