import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewMovieComponent } from './pages/new-movie/new-movie.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { UserViewComponent } from './pages/user-view/user-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UserViewComponent,
  },
  {
    path: 'users/:userId',
    component: UserViewComponent,
  },
  {
    path: 'new-user',
    component: NewUserComponent,
  },
  {
    path: 'users/:userId/edit-user',
    component: NewUserComponent
  },
  {
    path: 'users/:userId/new-movie',
    component: NewMovieComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
