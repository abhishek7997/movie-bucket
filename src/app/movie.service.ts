import { Injectable } from '@angular/core';
import Movie from './models/movie';
import User from './models/user';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private webService: WebService) { }

  getUsers() {
    return this.webService.get('users')
  }

  createUser(title: string) {
    return this.webService.post('users', { title })
  }

  getMovies(userId: string) {
    return this.webService.get(`users/${userId}/movies`)
  }

  createMovie(userId: string, title: string) {
    return this.webService.post(`users/${userId}/movies`, { title })
  }

  deleteUser(userId: string) {
    return this.webService.delete(`users/${userId}`)
  }

  updateUser(userId: string, username: string) {
    return this.webService.patch(`users/${userId}`, { title: username })
  }

  deleteMovie(userId: string, movieId: string) {
    return this.webService.delete(`users/${userId}/movies/${movieId}`)
  }

  setCompleted(userId: string, movie: Movie) {
    return this.webService.patch(`users/${userId}/movies/${movie._id}`, { completed: !movie.completed })
  }
}
