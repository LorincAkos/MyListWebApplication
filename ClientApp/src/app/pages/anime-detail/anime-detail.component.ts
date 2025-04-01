import { Component, signal, Signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { Subject, takeUntil } from 'rxjs';
import { AnimeDto } from '../../models/dtos/AnimeDto';

@Component({
  selector: 'app-anime-detail',
  imports: [RouterModule,],
  templateUrl: './anime-detail.component.html',
  styleUrl: './anime-detail.component.scss'
})
export class AnimeDetailComponent {
  anime = signal<AnimeDto>(new AnimeDto);

  destroy$: Subject<void> = new Subject<void>;

  constructor(private route: ActivatedRoute, private animeService: AnimeService) {}

  ngOnInit() {

    this.animeService.getAnime(String(this.route.snapshot.paramMap.get('id')));
        this.animeService.anime$
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (_anime) => {
            this.anime.set(_anime);
            console.log(this.anime())
          }
        })
  }
}
