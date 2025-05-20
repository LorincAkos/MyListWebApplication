import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AnimeDto } from '../../models/dtos/AnimeDto';
import { Subject, takeUntil } from 'rxjs';
import { AnimeService } from '../../services/anime.service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatusType } from '../../models/enums/StatusType';
import { getEnumText } from '../../utils';
import { PopUpService } from '../../services/pop-up.service';
import { GenreType } from '../../models/enums/GenreType';

@Component({
  selector: 'app-anime-list',
  imports: [RouterLink,CommonModule,],
  templateUrl: './anime-list.component.html',
  styleUrl: './anime-list.component.scss'
})
export class AnimeListComponent implements OnInit, OnDestroy{

  anime = signal<Array<AnimeDto>>([])

  destroy$: Subject<void> = new Subject<void>;

  constructor(private animeService: AnimeService, private popupService: PopUpService){}

  ngOnInit(): void{
    this.animeService.getAnimeList();
    this.animeService.animeList$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (_anime) => {
        this.anime.set(_anime);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getStatusStringFromEnum(enumNumber: number):string | undefined{
    return getEnumText(StatusType, enumNumber);
  }

  getGenreStringFromEnum(enumNumber: number):string | undefined{
    return getEnumText(GenreType, enumNumber);
  }

  showAnimeStatus(){
    this.popupService.openPopUp();
  }

  shortDate(date: string | undefined): string{
    if(date){
      return date.toString().slice(0,10);
    }
    return "Unknown";
  }
}
