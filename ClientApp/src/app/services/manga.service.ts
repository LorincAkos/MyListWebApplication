import { Injectable } from '@angular/core';
import { MangaDto } from '../models/dtos/MangaDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { MangaSelectDto } from '../models/dtos/MangaSelectDto';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
private _mangaListSubject : BehaviorSubject<MangaDto[]> = new BehaviorSubject<MangaDto[]>([]);
  private _mangaSubject : BehaviorSubject<MangaDto> = new BehaviorSubject<MangaDto>(new MangaDto);
  private _mangaSelectionListSubject : BehaviorSubject<MangaSelectDto[]> = new BehaviorSubject<MangaSelectDto[]>([]);
  
  constructor(private httpService: HttpService) { }

  getMangaList(): void{
    this.httpService.getMangaList().subscribe({
      next:(mangaList) => {
        this._mangaListSubject.next(mangaList);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  getManga(id: string): void{
    this.httpService.getManga(id).subscribe({
      next:(manga) => {
        this._mangaSubject.next(manga);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  getMangaSelection(): void{
    this.httpService.getMangaSelection().subscribe({
      next:(mangaSelectionList) => {
        this._mangaSelectionListSubject.next(mangaSelectionList);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  addManga(dto: MangaDto): Observable<MangaDto>{
    return this.httpService.addManga(dto);
  }

  updateManga(id: string, dto: MangaDto): Observable<MangaDto>{
    return this.httpService.updateManga(id,dto);
  }

  deleteManga(id: string): Observable<MangaDto>{
    return this.httpService.deleteManga(id);
  }

  get mangaList$(): Observable<MangaDto[]>{
    return this._mangaListSubject;
  }

  get mangaList(): MangaDto[]{
    return this._mangaListSubject.value;
  }

  get manga$(): Observable<MangaDto>{
    return this._mangaSubject;
  }

  get manga(): MangaDto{
    return this._mangaSubject.value;
  }

  get mangaSelectionList$(): Observable<MangaSelectDto[]>{
    return this._mangaSelectionListSubject;
  }

  get mangaSelectionList(): MangaSelectDto[]{
    return this._mangaSelectionListSubject.value;
  }
}
