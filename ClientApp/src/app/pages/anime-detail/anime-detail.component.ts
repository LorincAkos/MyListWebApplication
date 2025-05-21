import { Component, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { Subject, takeUntil } from 'rxjs';
import { AnimeDto } from '../../models/dtos/AnimeDto';
import { GenreType } from '../../models/enums/GenreType';
import { StatusType } from '../../models/enums/StatusType';
import { getEnumText } from '../../utils';
import { SharedDataService } from '../../services/shared-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-anime-detail',
  imports: [RouterModule,],
  templateUrl: './anime-detail.component.html',
  styleUrl: './anime-detail.component.scss'
})
export class AnimeDetailComponent implements OnInit, OnDestroy {
  anime = signal<AnimeDto>(new AnimeDto);

  destroy$: Subject<void> = new Subject<void>;

  constructor(private route: ActivatedRoute, private animeService: AnimeService, private router: Router, private sharedData: SharedDataService, public authService: AuthService) { }

  ngOnInit() {
    this.animeService.getAnime(String(this.route.snapshot.paramMap.get('id')));
    this.animeService.anime$
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
    this.sharedData.setAnime(this.anime());
    this.router.navigate(['/anime-edit']);
  }
}
