import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MoviesService } from '../movies.service';
import { MovieDigest } from '../movie.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  searchInput: FormControl;
  movieList$: Observable<MovieDigest[]>;

  constructor(private ms: MoviesService) { }

  ngOnInit() {
    this.searchInput = new FormControl('');
    this.searchInput.valueChanges.pipe(debounceTime(300))
      .subscribe((newVal: string) => this.ms.search(newVal));

    this.movieList$ = this.ms.getMovies();
  }

  // clearSearch(): void {
  //   this.searchInput.reset('');
  // }

  trackByMovieId(index: number, movieDigest: MovieDigest): number {
    return movieDigest.id;
  }

}
