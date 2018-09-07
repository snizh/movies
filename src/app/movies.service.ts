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
  moviesSubject: Subject<MovieDigest[]> = new BehaviorSubject<MovieDigest[]>(movieList);

  constructor() { }

  getMovies(): Observable<MovieDigest[]> {
    return this.moviesSubject.asObservable();
  }

  filter(params: any): void {
    this.moviesSubject.next(
      movieList
        .filter(elem => params.pattern ? elem.name.toLowerCase().includes(params.pattern.toLowerCase()) : true)
        .filter(elem => params.genre ? elem.genres.toLowerCase().includes(params.genre.toLowerCase()) : true)
    );
  }

  getMovie(movieId: number): Observable<MovieDetails> {
    return of<MovieDetails>(movies.filter(elem => elem.id === movieId)[0]);
  }

}
