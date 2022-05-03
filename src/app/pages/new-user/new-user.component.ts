import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import User from 'src/app/models/user';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  edit: boolean = false;
  userId: string | undefined;
  data: any = {
    edit: false,
    userId: undefined
  };

  constructor(private movieService: MovieService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.data = this.router.getCurrentNavigation()!.extras.state
    if (!this.data)
      return
    this.userId = this.data.user._id ?? null
    this.edit = this.data.edit ?? false
  }

  ngOnInit(): void {
    console.log(this.data)
    console.log(this.edit)
  }

  addUser(value: string) {
    this.movieService.createUser(value).subscribe((user: Object) => this.router.navigate(['/users', (user as User)._id]))
  }

  updateUser(value: string) {
    console.log(value)
    console.log(this.userId)
    this.movieService.updateUser(this.userId!, value).subscribe((user: Object) => this.router.navigate(['/users', (user as User)._id]))
  }

}
