import { Component, Input, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { GenreOptions } from '../../models/enums/GenreType';
import { StatusOptions } from '../../models/enums/StatusType';
import { deepEqual, RatingOptions } from '../../utils';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { AnimeSelectDto } from '../../models/dtos/AnimeSelectDto';
import { AnimeService } from '../../services/anime.service';
import { MangaService } from '../../services/manga.service';
import { StudioService } from '../../services/studio.service';
import { MangaDto } from '../../models/dtos/MangaDto';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AnimeEditComponent } from '../../pages/anime-edit/anime-edit.component';
import { SharedDataService } from '../../services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manga-edit',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    AsyncPipe,],
  templateUrl: './manga-edit.component.html',
  styleUrl: './manga-edit.component.scss'
})
export class MangaEditComponent {

  mangaform = new FormGroup({
    id: new FormControl(''),
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
    score: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^\d+(\.\d{1,2})?$/)
    ]),
    volume: new FormControl(0, [
      Validators.required,
    ]),
    chapter: new FormControl(0, [
      Validators.required,
    ]),
    genre: new FormControl([0], [
      Validators.required,
    ]),
    status: new FormControl(0, [
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

  matcher = new ErrorStateMatcher();
  genres = GenreOptions;
  statuses = StatusOptions;
  ratings = RatingOptions;

  manga!: MangaDto;
  animeSelection = signal<Array<AnimeSelectDto>>([]);

  adaptationOptions: Observable<AnimeSelectDto[]> = new Observable<AnimeSelectDto[]>();

  destroy$: Subject<void> = new Subject<void>;

  constructor(private studioService: StudioService, private animeService: AnimeService, private mangaService: MangaService, private sharedData: SharedDataService,private router: Router) { }

  ngOnInit(): void {
    this.manga = this.sharedData.getManga();
    this.setValueToForm();

    this.animeService.getAnimeSelection();
    this.animeService.animeSelectionList$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_animeSelection) => {
          this.animeSelection.set(_animeSelection);
          this.adaptationOptions = this.mangaform.controls.adaptation.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
        }
      });
  }
  ;


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _filter(value: string): AnimeSelectDto[] {
    const filterValue = value.toLowerCase();

    return this.animeSelection().filter(option => option.title.toLowerCase().includes(filterValue));
  }

  setValueToForm() {
    this.mangaform.controls.id.setValue(this.manga.id);
    this.mangaform.controls.title.setValue(this.manga.title);
    this.mangaform.controls.imgUrl.setValue(this.manga.imgUrl);
    this.mangaform.controls.description.setValue(this.manga.description);
    this.mangaform.controls.sd.setValue(this.manga.startDate!.toString().substring(0, 10));
    if (this.manga.endDate) {
      this.mangaform.controls.ed.setValue(this.manga.endDate!.toString().substring(0, 10));
    }
    this.mangaform.controls.score.setValue(this.manga.score);
    this.mangaform.controls.volume.setValue(this.manga.volume);
    this.mangaform.controls.chapter.setValue(this.manga.chapter);
    this.mangaform.controls.genre.setValue(this.manga.genre);
    this.mangaform.controls.status.setValue(this.manga.status);
    this.mangaform.controls.rating.setValue(String(this.manga.rating));
    this.mangaform.controls.adaptation.setValue(this.manga.adaptation);
    this.mangaform.controls.author.setValue(this.manga.author);
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

        this.mangaform.get('score')?.setValue(input.value, { emitEvent: false });
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

  toDateOnlyString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  onMangaSubmit() {
    if (this.mangaform.valid) {
      const formData = this.mangaform.value;

      const dto: MangaDto = {
        id: this.manga.id,
        title: formData.title!,
        imgUrl: formData.imgUrl!,
        description: formData.description!,
        startDate: formData.sd ? this.toDateOnlyString(new Date(formData.sd)) : undefined,
        endDate: formData.ed ? this.toDateOnlyString(new Date(formData.ed)) : undefined,
        score: Number(formData.score!),
        status: Number(formData.status!),
        volume: Number(formData.volume!),
        chapter: Number(formData.chapter!),
        rating: Number(formData.rating!),
        author: formData.author!,
        adaptation: formData.adaptation!,
        genre: formData.genre!.map(Number),
      }

      if(deepEqual(dto, this.manga)){
        console.log("No changes");
      }
      else{

        this.mangaService.updateManga(dto.id, dto).subscribe({
          next: (res) => {
            console.log('Product created:', res);
          },
          error: (err) => {
            console.error('Failed to create product:', err);
            
            console.error('Validation details:', err.error.errors);
          }
        });
      }
    } else {
      console.warn('Form is invalid');
    }
  }

  onDelete() {
    this.mangaService.deleteManga(this.manga.id).subscribe({
      next: (res) => {
        console.log('Product created:', res);
      },
      error: (err) => {
        console.error('Failed to create product:', err);

        console.error('Validation details:', err.error.errors);
      }
    });


    this.router.navigate(['/manga-list']);
  }

  test() {
    const formData = this.mangaform.value;
    console.log(formData);
  }
}
