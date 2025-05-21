import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnimeStatusViewComponent } from '../pop-ups/anime-status-view/anime-status-view.component';
import { LeadToLoginComponent } from '../pop-ups/lead-to-login/lead-to-login.component';
import { CartInfoComponent } from '../pop-ups/cart-info/cart-info.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(private dialog: MatDialog) { }

  openPopUp(){
    this.dialog.open(AnimeStatusViewComponent, {height: '50%', width: '30%', autoFocus: false});
  }

  openLoginPopUp(){
    this.dialog.open(LeadToLoginComponent, {height: '50%', width: '30%', autoFocus: false});
  }

  openCartPopUp(){
    this.dialog.open(CartInfoComponent, {height: '80%', width: '80%', autoFocus: false});
  }
}
