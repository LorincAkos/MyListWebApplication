import { Component, signal } from '@angular/core';
import { MangaDto } from '../../models/dtos/MangaDto';
import { Subject, takeUntil } from 'rxjs';
import { PopUpService } from '../../services/pop-up.service';
import { getEnumText } from '../../utils';
import { StatusType } from '../../models/enums/StatusType';
import { GenreType } from '../../models/enums/GenreType';
import { MangaService } from '../../services/manga.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manga-list',
  imports: [RouterLink,CommonModule,],
  templateUrl: './manga-list.component.html',
  styleUrl: './manga-list.component.scss'
})
export class MangaListComponent {
manga = signal<Array<MangaDto>>([])

  destroy$: Subject<void> = new Subject<void>;

  constructor(private mangaService: MangaService, private popupService: PopUpService){}

  ngOnInit(): void{
    this.mangaService.getMangaList();
    this.mangaService.mangaList$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (_manga) => {
        this.manga.set(_manga);
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
