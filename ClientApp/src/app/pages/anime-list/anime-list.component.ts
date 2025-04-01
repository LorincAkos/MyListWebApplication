import { Component, signal } from '@angular/core';
import { AnimeDto } from '../../models/dtos/AnimeDto';
import { Subject, takeUntil } from 'rxjs';
import { AnimeService } from '../../services/anime.service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anime-list',
  imports: [RouterLink,CommonModule,],
  templateUrl: './anime-list.component.html',
  styleUrl: './anime-list.component.scss'
})
export class AnimeListComponent {

  anime = signal<Array<AnimeDto>>([])

  destroy$: Subject<void> = new Subject<void>;

  constructor(private animeService: AnimeService){}

  ngOnInit(): void{
    this.animeService.getAnimeList();
    this.animeService.animeList$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (_anime) => {
        this.anime.set(_anime);
        console.log(this.anime())
      }
    })
  }
}
