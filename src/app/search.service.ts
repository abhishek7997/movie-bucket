import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  readonly ROOT_URL: string = 'https://api.themoviedb.org/3/search/movie'

  async getVideos(searchKey: string) {
    if (!searchKey)
      return []

    let data = await fetch(`${this.ROOT_URL}?api_key=${environment
      .API_KEY}&language=en-US&page=1&include_adult=false&query=${searchKey}`).then(res => res.json())

    return data.results

    // await fetch('https://api.themoviedb.org/3/search/movie?api_key=70fd02b5a3b13c408a62f6f2d6ff4d54&language=en-US&page=1&include_adult=false&query=spiderman').then(res => res.json())
  }
}
