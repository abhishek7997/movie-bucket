import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, Event } from '@angular/router';
import Movie from 'src/app/models/movie';
import User from 'src/app/models/user';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  users: User[] = []
  movies: Movie[] = []
  userId: string = '';

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.movieService.getUsers().subscribe((users: Object) => this.users = users as User[])

    this.route.params.subscribe((param: Params) => {
      this.userId = param['userId'];
      if (!this.userId) return

      this.movieService.getMovies(this.userId).subscribe((movies: Object) => this.movies = movies as Movie[])
    })
  }

  onmovieClick(movie: Movie) {
    this.movieService.setCompleted(this.userId, movie).subscribe(() => movie.completed = !movie.completed)
  }

  deletemovie(movie: Movie) {
    this.movieService.deleteMovie(this.userId, movie._id).subscribe((movie: Object) => this.movies = this.movies.filter(t => t._id != (movie as Movie)._id))
  }

  deleteuser(user: User, event: any) {
    event.stopImmediatePropagation()
    this.movieService.deleteUser(user._id).subscribe(() => this.users = this.users.filter(U => U._id != user._id))
    window.location.reload();
  }

  addMovieClick() {
    if (!this.userId) {
      alert("Please select a user to add to")
      return
    }

    this.router.navigate(['./new-movie'], { relativeTo: this.route })
  }

  updateUser(user: User) {
    this.router.navigate(['./edit-user'], { relativeTo: this.route, state: user })
  }

  fireEvent(e: any) {
    e.stopImmediatePropagation();
    // e.preventDefault();
    return false;
  }
}
