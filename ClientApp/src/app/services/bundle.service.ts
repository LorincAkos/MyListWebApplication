import { Injectable } from '@angular/core';
import { BundleDto } from '../models/dtos/BundleDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BundleService {
private _bundleListSubject : BehaviorSubject<BundleDto[]> = new BehaviorSubject<BundleDto[]>([]);
  private _bundleSubject : BehaviorSubject<BundleDto> = new BehaviorSubject<BundleDto>(new BundleDto);
  
  constructor(private httpService: HttpService) { }

  getBundleList(): void{
    this.httpService.getBundleList().subscribe({
      next:(bundleList) => {
        this._bundleListSubject.next(bundleList);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  getBundle(id: string): void{
    this.httpService.getBundle(id).subscribe({
      next:(manga) => {
        this._bundleSubject.next(manga);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  addBundle(dto: BundleDto): Observable<BundleDto>{
    return this.httpService.addBundle(dto);
  }

  updateBundle(id: string, dto: BundleDto): Observable<BundleDto>{
    return this.httpService.updateBundle(id,dto);
  }

  deleteBundle(id: string): Observable<BundleDto>{
    return this.httpService.deleteBundle(id);
  }

  get bundleList$(): Observable<BundleDto[]>{
    return this._bundleListSubject;
  }

  get bundleList(): BundleDto[]{
    return this._bundleListSubject.value;
  }

  get storage$(): Observable<BundleDto>{
    return this._bundleSubject;
  }

  get storage(): BundleDto{
    return this._bundleSubject.value;
  }
}
