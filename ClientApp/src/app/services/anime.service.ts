import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnimeDto } from '../models/dtos/AnimeDto';
import { HttpService } from './http.service';
import { AnimeSelectDto } from '../models/dtos/AnimeSelectDto';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private _animeListSubject: BehaviorSubject<AnimeDto[]> = new BehaviorSubject<AnimeDto[]>([]);
  private _animeSubject: BehaviorSubject<AnimeDto> = new BehaviorSubject<AnimeDto>(new AnimeDto);
  private _animeSelectionListSubject: BehaviorSubject<AnimeSelectDto[]> = new BehaviorSubject<AnimeSelectDto[]>([]);

  constructor(private httpService: HttpService) { }

  getAnimeList(): void {
    this.httpService.getAnimeList().subscribe({
      next: (animeList) => {
        this._animeListSubject.next(animeList);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getAnime(id: string): void {
    this.httpService.getAnime(id).subscribe({
      next: (anime) => {
        this._animeSubject.next(anime);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getAnimeSelection(): void {
    this.httpService.getAnimeSelectionList().subscribe({
      next: (animeSelectionList) => {
        this._animeSelectionListSubject.next(animeSelectionList);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addAnime(dto: AnimeDto): Observable<AnimeDto> {
    return this.httpService.addAnime(dto);
  }

  updateAnime(id: string, dto: AnimeDto): Observable<AnimeDto> {
    return this.httpService.updateAnime(id, dto);
  }

  deleteAnime(id: string): Observable<AnimeDto> {
    return this.httpService.deleteAnime(id);
  }

  get animeList$(): Observable<AnimeDto[]> {
    return this._animeListSubject;
  }

  get animeList(): AnimeDto[] {
    return this._animeListSubject.value;
  }

  get anime$(): Observable<AnimeDto> {
    return this._animeSubject;
  }

  get anime(): AnimeDto {
    return this._animeSubject.value;
  }

  get animeSelectionList$(): Observable<AnimeSelectDto[]> {
    return this._animeSelectionListSubject;
  }

  get animeSelectionList(): AnimeSelectDto[] {
    return this._animeSelectionListSubject.value;
  }
}
