import { Component, OnInit, Input } from '@angular/core';

import { MovieDigest } from '../movie.model';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent implements OnInit {
  @Input() movie: MovieDigest;

  constructor() { }

  ngOnInit() {
  }

}
