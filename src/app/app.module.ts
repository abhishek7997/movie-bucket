import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { NewMovieComponent } from './pages/new-movie/new-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    UserViewComponent,
    NewUserComponent,
    NewMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
