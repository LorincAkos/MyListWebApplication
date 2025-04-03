import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnimeStatusViewComponent } from '../pop-ups/anime-status-view/anime-status-view.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(private dialog: MatDialog) { }

  openPopUp(){
    this.dialog.open(AnimeStatusViewComponent, {height: '50%', width: '30%', autoFocus: false});
  }
}
