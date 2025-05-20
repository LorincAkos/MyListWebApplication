import { Injectable } from '@angular/core';
import { StorageDto } from '../models/dtos/StorageDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storageListSubject: BehaviorSubject<StorageDto[]> = new BehaviorSubject<StorageDto[]>([]);
  private _storageSubject: BehaviorSubject<StorageDto> = new BehaviorSubject<StorageDto>(new StorageDto);

  constructor(private httpService: HttpService) { }

  getstorageList(): void {
    this.httpService.getStorageList().subscribe({
      next: (storageList) => {
        this._storageListSubject.next(storageList);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getStorage(id: string): void {
    this.httpService.getStorage(id).subscribe({
      next: (manga) => {
        this._storageSubject.next(manga);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addStorage(dto: StorageDto): Observable<StorageDto> {
    return this.httpService.addStorage(dto);
  }

  updateStorage(id: string, dto: StorageDto): Observable<StorageDto> {
    return this.httpService.updateStorage(id, dto);
  }

  deleteStorage(id: string): Observable<StorageDto> {
    return this.httpService.deleteStorage(id);
  }

  get storageList$(): Observable<StorageDto[]> {
    return this._storageListSubject;
  }

  get storageList(): StorageDto[] {
    return this._storageListSubject.value;
  }

  get storage$(): Observable<StorageDto> {
    return this._storageSubject;
  }

  get storage(): StorageDto {
    return this._storageSubject.value;
  }
}
