import { Component, signal } from '@angular/core';
import { MangaDto } from '../../models/dtos/MangaDto';
import { MangaService } from '../../services/manga.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenreType } from '../../models/enums/GenreType';
import { StatusType } from '../../models/enums/StatusType';
import { getEnumText } from '../../utils';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-manga-detail',
  imports: [],
  templateUrl: './manga-detail.component.html',
  styleUrl: './manga-detail.component.scss'
})
export class MangaDetailComponent {
manga = signal<MangaDto>(new MangaDto);

  destroy$: Subject<void> = new Subject<void>;

  constructor(private route: ActivatedRoute, private mangaService: MangaService,private router: Router, private sharedData: SharedDataService) { }

  ngOnInit() {
    this.mangaService.getManga(String(this.route.snapshot.paramMap.get('id')));
    this.mangaService.manga$
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

  getStatusStringFromEnum(enumNumber: number): string | undefined {
    return getEnumText(StatusType, enumNumber);
  }

  getGenreStringFromEnum(enumNumber: number): string | undefined {
    return getEnumText(GenreType, enumNumber);
  }

  shortDate(date: string | undefined): string{
    if(date){
      return date.toString().slice(0,10);
    }
    return "Unknown";
  }

  goToEditPage() {
    this.sharedData.setManga(this.manga());
    this.router.navigate(['/manga-edit']);
  }
}
