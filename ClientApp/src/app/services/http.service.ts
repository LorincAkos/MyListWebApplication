import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimeDto } from '../models/dtos/AnimeDto';
import { StudioSelectDto } from '../models/dtos/StudioSelectDto';
import { AnimeSelectDto } from '../models/dtos/AnimeSelectDto';
import { MangaSelectDto } from '../models/dtos/MangaSelectDto';
import { MangaDto } from '../models/dtos/MangaDto';
import { StorageDto } from '../models/dtos/StorageDto';
import { BundleDto } from '../models/dtos/BundleDto';

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

  addAnime(dto: AnimeDto): Observable<AnimeDto>{
    return this.http.post<AnimeDto>(this.backend + '/api/Anime/AddAnime', dto)
  }

  updateAnime(id: string, dto: AnimeDto): Observable<AnimeDto>{
    return this.http.put<AnimeDto>(this.backend + '/api/Anime/UpdateAnime/'+id,dto)
  }

  deleteAnime(id: string): Observable<AnimeDto>{
    const params = new HttpParams().set('id', id);
    return this.http.delete<AnimeDto>(this.backend + '/api/Anime/DeleteAnime', {params});
  }

  getAnimeSelectionList(): Observable<AnimeSelectDto[]>{
    return this.http.get<AnimeSelectDto[]>(this.backend + '/api/Anime/GetAnimeSelectionList');
  }

  getMangaList(): Observable<MangaDto[]>{
    return this.http.get<MangaDto[]>(this.backend + '/api/Manga/GetMangaList');
  }

  getManga(id: string): Observable<MangaDto>{
    const params = new HttpParams().set('id', id);
    return this.http.get<MangaDto>(this.backend + '/api/Manga/Getmanga', {params});
  }

  addManga(dto: MangaDto): Observable<MangaDto>{
    return this.http.post<MangaDto>(this.backend + '/api/Manga/AddManga', dto)
  }

  updateManga(id: string, dto: MangaDto): Observable<MangaDto>{
    return this.http.put<MangaDto>(this.backend + '/api/Manga/UpdateManga/'+id,dto)
  }

  deleteManga(id: string): Observable<MangaDto>{
    const params = new HttpParams().set('id', id);
    return this.http.delete<MangaDto>(this.backend + '/api/Manga/DeleteManga', {params});
  }

  getMangaSelection(): Observable<MangaSelectDto[]>{
    return this.http.get<MangaSelectDto[]>(this.backend + '/api/Manga/GetmangaSelectionList');
  }

   getStudioSelection(): Observable<StudioSelectDto[]>{
    return this.http.get<StudioSelectDto[]>(this.backend + '/api/Studio/GetSelection');
  }

  getStorageList(): Observable<StorageDto[]>{
    return this.http.get<StorageDto[]>(this.backend + '/api/Storage/GetStorageList');
  }

  getStorage(id: string): Observable<StorageDto>{
    const params = new HttpParams().set('id', id);
    return this.http.get<StorageDto>(this.backend + '/api/Storage/Get', {params});
  }

  addStorage(dto: StorageDto): Observable<StorageDto>{
    return this.http.post<StorageDto>(this.backend + '/api/Storage/Add', dto)
  }

  updateStorage(id: string, dto: StorageDto): Observable<StorageDto>{
    return this.http.put<StorageDto>(this.backend + '/api/Storage/Update/'+id,dto)
  }

  deleteStorage(id: string): Observable<StorageDto>{
    const params = new HttpParams().set('id', id);
    return this.http.delete<StorageDto>(this.backend + '/api/Storage/Delete', {params});
  }

  getBundleList(): Observable<BundleDto[]>{
    return this.http.get<BundleDto[]>(this.backend + '/api/Bundle/GetBundleList');
  }

  getBundle(id: string): Observable<BundleDto>{
    const params = new HttpParams().set('id', id);
    return this.http.get<BundleDto>(this.backend + '/api/Bundle/Get', {params});
  }

  addBundle(dto: BundleDto): Observable<BundleDto>{
    return this.http.post<BundleDto>(this.backend + '/api/Bundle/Add', dto)
  }

  updateBundle(id: string, dto: BundleDto): Observable<BundleDto>{
    return this.http.put<BundleDto>(this.backend + '/api/Bundle/Update/'+id,dto)
  }

  deleteBundle(id: string): Observable<BundleDto>{
    const params = new HttpParams().set('id', id);
    return this.http.delete<BundleDto>(this.backend + '/api/Bundle/Delete', {params});
  }
}
