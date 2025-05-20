import { Injectable } from '@angular/core';
import { StudioSelectDto } from '../models/dtos/StudioSelectDto';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StudioService {
  private _studioSelectionSubject: BehaviorSubject<StudioSelectDto[]> = new BehaviorSubject<StudioSelectDto[]>([]);

  constructor(private httpService: HttpService) { }

  getStudioSelection(): void {
    this.httpService.getStudioSelection().subscribe({
      next: (studioSelectionList) => {
        this._studioSelectionSubject.next(studioSelectionList);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  get studioSelectionList$(): Observable<StudioSelectDto[]>{
      return this._studioSelectionSubject;
    }
  
    get studioSelectionList(): StudioSelectDto[]{
      return this._studioSelectionSubject.value;
    }
}
