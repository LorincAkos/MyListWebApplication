import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnimeDto } from '../models/dtos/AnimeDto';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private _animeListSubject : BehaviorSubject<AnimeDto[]> = new BehaviorSubject<AnimeDto[]>([]);
  private _animeSubject : BehaviorSubject<AnimeDto> = new BehaviorSubject<AnimeDto>(new AnimeDto);
  
  constructor(private httpService: HttpService) { }

  getAnimeList(): void{
    this.httpService.getAnimeList().subscribe({
      next:(animeList) => {
        this._animeListSubject.next(animeList);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  getAnime(id: string): void{
    this.httpService.getAnime(id).subscribe({
      next:(anime) => {
        this._animeSubject.next(anime);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  get animeList$(): Observable<AnimeDto[]>{
    return this._animeListSubject;
  }

  get animeList(): AnimeDto[]{
    return this._animeListSubject.value;
  }

  get anime$(): Observable<AnimeDto>{
    return this._animeSubject;
  }

  get anime(): AnimeDto{
    return this._animeSubject.value;
  }
}
