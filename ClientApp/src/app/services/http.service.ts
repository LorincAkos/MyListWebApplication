import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimeDto } from '../models/dtos/AnimeDto';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  backend: string ='https://localhost:7291';

  getAnimeList(): Observable<AnimeDto[]>{
    return this.http.get<AnimeDto[]>(this.backend + '/api/Anime/GetAnimeList');
  }

  getAnime(id: string): Observable<AnimeDto>{
    const params = new HttpParams().set('id', id);
    return this.http.get<AnimeDto>(this.backend + '/api/Anime/GetAnime', {params});
  }
}
