import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StudioService } from '../../services/studio.service';
import { StudioSelectDto } from '../../models/dtos/StudioSelectDto';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { AnimeSelectDto } from '../../models/dtos/AnimeSelectDto';
import { AnimeService } from '../../services/anime.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MangaService } from '../../services/manga.service';
import { GenreOptions } from '../../models/enums/GenreType';
import { StatusOptions } from '../../models/enums/StatusType';
import { getSeason, RatingOptions, toDateOnlyString } from '../../utils';
import { AnimeDto } from '../../models/dtos/AnimeDto';
import { AsyncPipe } from '@angular/common';
import { MangaDto } from '../../models/dtos/MangaDto';

@Component({
  selector: 'app-add-record',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    AsyncPipe,],
  templateUrl: './add-record.component.html',
  styleUrl: './add-record.component.scss'
})
export class AddRecordComponent {
  animeform = new FormGroup({
    imgUrl: new FormControl(''),
    title: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl(''),
    sd: new FormControl(new Date().toISOString().substring(0, 10)
      , [
        Validators.required,
      ]),
    ed: new FormControl(''),
    score: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+(\.\d{1,2})?$/)
    ]),
    episodeNum: new FormControl('', [
      Validators.required,
    ]),
    episodeDur: new FormControl('', [
      Validators.required,
    ]),
    genre: new FormControl([], [
      Validators.required,
    ]),
    status: new FormControl('', [
      Validators.required,
    ]),
    studio: new FormControl('', [
      Validators.required,
    ]),
    rating: new FormControl('', [
      Validators.required,
    ]),
    prequel: new FormControl(''),
    sequel: new FormControl(''),
    source: new FormControl(''),
  });

  mangaform = new FormGroup({
    imgUrl: new FormControl(''),
    title: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl(''),
    sd: new FormControl(new Date().toISOString().substring(0, 10)
      , [
        Validators.required,
      ]),
    ed: new FormControl(''),
    score: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+(\.\d{1,2})?$/)
    ]),
    volume: new FormControl('', [
      Validators.required,
    ]),
    chapter: new FormControl('', [
      Validators.required,
    ]),
    genre: new FormControl([], [
      Validators.required,
    ]),
    status: new FormControl('', [
      Validators.required,
    ]),
    author: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9 ]{1,20}$')
    ]),
    rating: new FormControl('', [
      Validators.required,
    ]),
    adaptation: new FormControl(''),
  });

  isAnime = signal<boolean>(true);

  matcher = new ErrorStateMatcher();

  genres = GenreOptions;
  statuses = StatusOptions;
  ratings = RatingOptions;

  studioSelection = signal<Array<StudioSelectDto>>([])
  animeSelection = signal<Array<AnimeSelectDto>>([])

  prequelOptions: Observable<AnimeSelectDto[]> = new Observable<AnimeSelectDto[]>();
  sequelOptions: Observable<AnimeSelectDto[]> = new Observable<AnimeSelectDto[]>();
  adaptationOptions: Observable<AnimeSelectDto[]> = new Observable<AnimeSelectDto[]>();

  destroy$: Subject<void> = new Subject<void>;

  constructor(private studioService: StudioService, private animeService: AnimeService, private mangaService: MangaService) { }

  ngOnInit(): void {
    this.studioService.getStudioSelection();
    this.studioService.studioSelectionList$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_studioSelection) => {
          this.studioSelection.set(_studioSelection);
        }
      });

    this.animeService.getAnimeSelection();
    this.animeService.animeSelectionList$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_animeSelection) => {
          this.animeSelection.set(_animeSelection);
          this.prequelOptions = this.animeform.controls.prequel.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
          this.sequelOptions = this.animeform.controls.sequel.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
          this.adaptationOptions = this.mangaform.controls.adaptation.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
        }
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _filter(value: string): AnimeSelectDto[] {
    const filterValue = value.toLowerCase();

    return this.animeSelection().filter(option => option.title.toLowerCase().includes(filterValue));
  }
  changeRecordType() {
    this.isAnime.set(!this.isAnime())
  }

  limitScore(event: any): void {
      const input = event.target;
      const value = input.value;
  
      if (value > 10) {
        input.value = 10;
      }
  
      if (value.includes('.')) {
        const [integer, decimal] = value.split('.');
        if (decimal.length > 2) {
          input.value = `${integer}.${decimal.substring(0, 2)}`;
  
          this.animeform.get('score')?.setValue(input.value, { emitEvent: false });
        }
      }
    }
  
    blockForScore(event: KeyboardEvent): void {
      const blocked = ['-', 'e', 'E', '+'];
      if (blocked.includes(event.key)) {
        event.preventDefault();
      }
    }
    blockForEpisode(event: KeyboardEvent): void {
      const blocked = ['-', '.', ',', 'e', 'E', '+'];
      if (blocked.includes(event.key)) {
        event.preventDefault();
      }
    }
  
    displayAnimeTitle = (animeId: string | null | undefined): string => {
      const anime = this.animeSelection().find(a => a.id === animeId);
      return anime?.title || '';
    };
  
    
  
    onAnimeSubmit() {
      if (this.animeform.valid) {
        const formData = this.animeform.value;
  
        const dto: AnimeDto = {
          id: "",
          premier: getSeason(new Date(formData.sd!)),
          title: formData.title!,
          imgUrl: formData.imgUrl!,
          description: formData.description!,
          startDate: formData.sd ? toDateOnlyString(new Date(formData.sd)) : undefined,
          endDate: formData.ed ? toDateOnlyString(new Date(formData.ed)) : undefined,
          score: Number(formData.score!),
          status: Number(formData.status!),
          episode: Number(formData.episodeNum!),
          duration: Number(formData.episodeDur!),
          studio: formData.studio!,
          rating: Number(formData.rating!),
          prequel: formData.prequel!,
          sequel: formData.sequel!,
          source: formData.source!,
          genre: formData.genre!.map(Number),
        }
        console.log(dto);
        this.animeService.addAnime(dto).subscribe({
          next: (res) => {
            console.log('Product created:', res);
          },
          error: (err) => {
            console.error('Failed to create product:', err);
  
            console.error('Validation details:', err.error.errors);
          }
        })
      } else {
        console.warn('Form is invalid');
      }
    }

    onMangaSubmit() {
        if (this.mangaform.valid) {
          const formData = this.mangaform.value;
    
          const dto: MangaDto = {
            id: "",
            title: formData.title!,
            imgUrl: formData.imgUrl!,
            description: formData.description!,
            startDate: formData.sd ? toDateOnlyString(new Date(formData.sd)) : undefined,
            endDate: formData.ed ? toDateOnlyString(new Date(formData.ed)) : undefined,
            score: Number(formData.score!),
            status: Number(formData.status!),
            volume: Number(formData.volume!),
            chapter: Number(formData.chapter!),
            rating: Number(formData.rating!),
            author: formData.author!,
            adaptation: formData.adaptation!,
            genre: formData.genre!.map(Number),
          }
          console.log(dto);
          this.mangaService.addManga(dto).subscribe({
            next: (res) => {
              console.log('Product created:', res);
            },
            error: (err) => {
              console.error('Failed to create product:', err);
    
              console.error('Validation details:', err.error.errors);
            }
          })
        } else {
          console.warn('Form is invalid');
        }
      }
}
