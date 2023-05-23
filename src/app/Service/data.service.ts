import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Movie } from '../Model/movie';

@Injectable({
  providedIn: 'root'
})
export class DataService {
url:string= 'https://api.themoviedb.org/3';
  constructor(private http:HttpClient) { }


  getLatestMovies():Observable<Movie>{
   return this.http.get<Movie>(`${this.url}/trending/all/week?api_key=${environment.api_key}`)
  }


  getActionMovies():Observable<Movie>{
   return this.http.get<Movie>(`${this.url}/discover/movie?api_key=${environment.api_key}&with_genres=28`)
  }

  getComedyMovies():Observable<Movie>{
    return this.http.get<Movie>(`${this.url}/discover/movie?api_key=${environment.api_key}&with_genres=35`)

  }

  getHorrorMovies():Observable<Movie>{
  return this.http.get<Movie>(`${this.url}/discover/movie?api_key=${environment.api_key}&with_genres=27`)
  }

  getRomanceMovies():Observable<Movie>{
    return this.http.get<Movie>(`${this.url}/discover/movie?api_key=${environment.api_key}&with_genres=10749`)
  }

  getTrendingMovies():Observable<Movie>{
    return this.http.get<Movie>(`${this.url}/trending/all/week?api_key=${environment.api_key}&language=en-US`)
  }
}
