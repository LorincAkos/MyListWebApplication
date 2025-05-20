import { Injectable } from '@angular/core';
import { AnimeDto } from '../models/dtos/AnimeDto';
import { MangaDto } from '../models/dtos/MangaDto';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private _anime!: AnimeDto ;
  private _manga!: MangaDto ;

  setAnime(anime: AnimeDto){
    this._anime = anime;
  }

  getAnime(){
    return this._anime;
  }

  setManga(manga: MangaDto){
    this._manga = manga;
  }

  getManga(){
    return this._manga;
  }
}
