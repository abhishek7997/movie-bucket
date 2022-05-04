import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import Movie from 'src/app/models/movie';
import { MovieService } from 'src/app/movie.service';
import { SearchService } from 'src/app/search.service';

// const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
//   'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
//   'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
//   'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
//   'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
//   'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
//   'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
//   'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss']
})
export class NewMovieComponent implements OnInit {

  userId!: string;
  states: any = [];
  selectedMovie: any | undefined;
  public model: any;

  constructor(private searchService: SearchService, private movieService: MovieService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => this.userId = params['userId'])
  }

  ngOnInit(): void {
  }

  addMovie() {
    if (!this.selectedMovie)
      return
    this.movieService.createMovie(this.userId, this.selectedMovie.title, this.selectedMovie.release_date).subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }))
  }

  async getVideoList(term: string) {
    if (!term || term.trim().length <= 2)
      return []

    this.states = await this.searchService.getVideos(term.trim())
    return this.states
  }


  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchText) => this.getVideoList(searchText)),
      // map(term => term.length < 2 ? []
      //   : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  }

  /**
  * Used to format the result data from the lookup into the
  * display and list values. Maps `{name: "band", id:"id" }` into a string
  */
  resultFormatBandListValue(value: any) {
    if (value.title)
      return value.title
    return value
  }

  inputFormatBandListValue(value: any) {
    if (value.title)
      return value.title
    return value
  }

  selectItem(event: any) {
    this.selectedMovie = event.item
  }
}
