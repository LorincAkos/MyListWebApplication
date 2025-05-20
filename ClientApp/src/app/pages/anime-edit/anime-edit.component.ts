import { Component, Input, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { GenreOptions } from '../../models/enums/GenreType';
import { StatusOptions, StatusType } from '../../models/enums/StatusType';
import { deepEqual, getEnumText, getSeason, RatingOptions, toDateOnlyString } from '../../utils';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { AnimeSelectDto } from '../../models/dtos/AnimeSelectDto';
import { StudioSelectDto } from '../../models/dtos/StudioSelectDto';
import { AnimeService } from '../../services/anime.service';
import { StudioService } from '../../services/studio.service';
import { AnimeDto } from '../../models/dtos/AnimeDto';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedDataService } from '../../services/shared-data.service';
import { MangaService } from '../../services/manga.service';
import { MangaSelectDto } from '../../models/dtos/MangaSelectDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anime-edit',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './anime-edit.component.html',
  styleUrl: './anime-edit.component.scss'
})
export class AnimeEditComponent {

  animeform = new FormGroup({
    id: new FormControl('', [
      Validators.required,
    ]),
    title: new FormControl('', [
      Validators.required,
    ]),
    imgUrl: new FormControl(''),
    description: new FormControl(''),
    sd: new FormControl(new Date().toISOString().substring(0, 10)
      , [
        Validators.required,
      ]),
    ed: new FormControl(''),
    score: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^\d+(\.\d{1,2})?$/)
    ]),
    episodeNum: new FormControl(0, [
      Validators.required,
    ]),
    episodeDur: new FormControl(0, [
      Validators.required,
    ]),
    genre: new FormControl([0], [
      Validators.required,
    ]),
    status: new FormControl(0, [
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

  matcher = new ErrorStateMatcher();

  genres = GenreOptions;
  statuses = StatusOptions;
  ratings = RatingOptions;

  anime!: AnimeDto;
  animeSelection = signal<Array<AnimeSelectDto>>([]);
  mangaSelection = signal<Array<MangaSelectDto>>([]);
  studioSelection = signal<Array<StudioSelectDto>>([]);

  prequelOptions: Observable<AnimeSelectDto[]> = new Observable<AnimeSelectDto[]>();
  sequelOptions: Observable<AnimeSelectDto[]> = new Observable<AnimeSelectDto[]>();
  sourceOptions: Observable<MangaSelectDto[]> = new Observable<MangaSelectDto[]>();

  destroy$: Subject<void> = new Subject<void>;

  constructor(private studioService: StudioService, private animeService: AnimeService, private sharedData: SharedDataService, private mangaService: MangaService,private router: Router) { }

  ngOnInit(): void {
    this.anime = this.sharedData.getAnime();
    this.setValueToForm();

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
            map(value => this._animefilter(value || '')),
          );
          this.sequelOptions = this.animeform.controls.sequel.valueChanges.pipe(
            startWith(''),
            map(value => this._animefilter(value || '')),
          );
        }
      });
    this.mangaService.getMangaSelection();
    this.mangaService.mangaSelectionList$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_mangaSelection) => {
          this.mangaSelection.set(_mangaSelection);
          this.sourceOptions = this.animeform.controls.source.valueChanges.pipe(
            startWith(''),
            map(value => this._mangafilter(value || '')),
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _animefilter(value: string): AnimeSelectDto[] {
    const filterValue = value.toLowerCase();

    return this.animeSelection().filter(option => option.title.toLowerCase().includes(filterValue));
  }

  private _mangafilter(value: string): MangaSelectDto[] {
    const filterValue = value.toLowerCase();

    return this.mangaSelection().filter(option => option.title.toLowerCase().includes(filterValue));
  }

  setValueToForm() {
    this.animeform.controls.id.setValue(this.anime.id);
    this.animeform.controls.title.setValue(this.anime.title);
    this.animeform.controls.imgUrl.setValue(this.anime.imgUrl);
    this.animeform.controls.description.setValue(this.anime.description);
    this.animeform.controls.sd.setValue(this.anime.startDate!.toString().substring(0, 10));
    if(this.anime.endDate){
      this.animeform.controls.ed.setValue(this.anime.endDate!.toString().substring(0, 10));
    }
    this.animeform.controls.score.setValue(this.anime.score);
    this.animeform.controls.episodeNum.setValue(this.anime.episode);
    this.animeform.controls.episodeDur.setValue(this.anime.duration);
    this.animeform.controls.genre.setValue(this.anime.genre);
    this.animeform.controls.status.setValue(this.anime.status);
    this.animeform.controls.studio.setValue(this.anime.studio);
    this.animeform.controls.rating.setValue(String(this.anime.rating));
    this.animeform.controls.prequel.setValue(this.anime.prequel);
    this.animeform.controls.sequel.setValue(this.anime.sequel);
    this.animeform.controls.source.setValue(this.anime.source);
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

  displayMangaTitle = (animeId: string | null | undefined): string => {
    const anime = this.mangaSelection().find(a => a.id === animeId);
    return anime?.title || '';
  };

  onAnimeSubmit() {
    if (this.animeform.valid) {
      const formData = this.animeform.value;

      const dto: AnimeDto = {
        id: this.anime.id,
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

      if(deepEqual(dto,this.anime)){
        console.log("No changes")
      }
      else{
        this.animeService.updateAnime(this.anime.id, dto).subscribe({
          next: (res) => {
            console.log('Product created:', res);
          },
          error: (err) => {
            console.error('Failed to create product:', err);
            
            console.error('Validation details:', err.error.errors);
          }
        })
      }
    } else {
      console.warn('Form is invalid');
    }
  }

  onDelete() {
    this.animeService.deleteAnime(this.anime.id).subscribe({
      next: (res) => {
        console.log('Product created:', res);
      },
      error: (err) => {
        console.error('Failed to create product:', err);

        console.error('Validation details:', err.error.errors);
      }
    });


    this.router.navigate(['/anime-list']);
  }

  test(){
    const formData = this.animeform.value;
    console.log(formData);
  }
}


