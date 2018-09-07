import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  NavigationExtras,
  Params
} from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MoviesService } from '../movies.service';
import { genreType, MovieDigest } from '../movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  searchInput: FormControl;
  genreSelector: FormControl;
  movieList$: Observable<MovieDigest[]>;
  genres: string[] = [
    null,
    ...Object.keys(genreType).map(key => genreType[key])
  ];

  private filterParams: Params;

  private subscribtion: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ms: MoviesService
  ) {}

  ngOnInit() {
    this.movieList$ = this.ms.getMovies();

    this.searchInput = new FormControl('');
    this.genreSelector = new FormControl(this.genres[0]);

    this.subscribtion = this.activatedRoute.queryParamMap.subscribe(
      (paramMap: ParamMap) => {
        this.filterParams = {
          ...(paramMap.get('pattern')
            ? { pattern: paramMap.get('pattern') }
            : {}),
          ...(paramMap.get('genre') ? { genre: paramMap.get('genre') } : {})
        };

        this.searchInput.setValue(this.filterParams.pattern);

        const matchedGenre = this.genres.find(
          g => g === this.filterParams.genre
        );
        this.genreSelector.setValue(matchedGenre);

        this.ms.filter(this.filterParams);
      }
    );

    this.searchInput.valueChanges
      .pipe(debounceTime(300))
      .subscribe((searchPattern: string) => {
        const extras: NavigationExtras = {
          queryParams: { ...this.filterParams, pattern: searchPattern }
        };
        if (!searchPattern) {
          delete extras.queryParams.pattern;
        }
        this.router.navigate(['.'], extras);
      });

    this.genreSelector.valueChanges.subscribe((genre: string) => {
      const extras: NavigationExtras = {
        queryParams: { ...this.filterParams, genre: genre }
      };
      if (!genre) {
        delete extras.queryParams.genre;
      }
      this.router.navigate(['.'], extras);
    });
  }

  trackByMovieId(index: number, movieDigest: MovieDigest): number {
    return movieDigest.id;
  }
}
