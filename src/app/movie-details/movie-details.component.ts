import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { MoviesService } from '../movies.service';
import { MovieDetails } from '../movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieDetails$: Observable<MovieDetails>;

  constructor(private route: ActivatedRoute, private ms: MoviesService) { }

  ngOnInit() {
    this.movieDetails$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          const id = parseInt(params.get('id'), 10);
          return this.ms.getMovie(id);
        })
    );
  }

}
