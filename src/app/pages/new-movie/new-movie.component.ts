import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Movie from 'src/app/models/movie';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss']
})
export class NewMovieComponent implements OnInit {

  userId!: string;
  constructor(private movieService: MovieService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => this.userId = params['userId'])
  }

  ngOnInit(): void {
  }

  addMovie(value: string) {
    this.movieService.createMovie(this.userId, value).subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }))
  }
}
