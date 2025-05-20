import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StorageDto } from '../../models/dtos/StorageDto';
import { MangaService } from '../../services/manga.service';
import { StorageService } from '../../services/storage.service';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { MangaSelectDto } from '../../models/dtos/MangaSelectDto';
import { MatTableModule } from '@angular/material/table';
import { BundleDto } from '../../models/dtos/BundleDto';
import { BundleService } from '../../services/bundle.service';

@Component({
  selector: 'app-storage',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatTableModule],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss'
})
export class StorageComponent {

  storageform = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [
      Validators.required,
    ]),
    imgUrl: new FormControl(''),
    volume: new FormControl('', [
      Validators.required,
    ]),
    count: new FormControl('', [
      Validators.required,
    ]),
    price: new FormControl('', [
      Validators.required,
    ]),
  });

  bundleform = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [
      Validators.required,
    ]),
    imgUrl: new FormControl(''),
    books: new FormControl([''], [
      Validators.required,
    ]),
    price: new FormControl('', [
      Validators.required,
    ]),
  });

  isStorage = signal<boolean>(true);
  mangaSelection = signal<Array<MangaSelectDto>>([]);
  storageList = signal<Array<StorageDto>>([]);
  bundleList = signal<Array<BundleDto>>([]);

  singleBookCollapsed = true;
  bundleCollapsed = true;
  addbundle = true;

  titleOptions: Observable<MangaSelectDto[]> = new Observable<MangaSelectDto[]>();

  destroy$: Subject<void> = new Subject<void>;

  constructor(private mangaService: MangaService, private storageService: StorageService, private bundleService: BundleService) { }

  ngOnInit(): void {
    this.mangaService.getMangaSelection();
    this.mangaService.mangaSelectionList$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_mangaSelection) => {
          this.mangaSelection.set(_mangaSelection);
          this.titleOptions = this.storageform.controls.title.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
        }
      });

    this.storageService.getstorageList();
    this.storageService.storageList$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_storageSelection) => {
          this.storageList.set(_storageSelection);
        }
      });

    this.bundleService.getBundleList();
    this.bundleService.bundleList$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_bundleSelection) => {
          this.bundleList.set(_bundleSelection);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _filter(value: string): MangaSelectDto[] {
    const filterValue = value.toLowerCase();

    return this.mangaSelection().filter(option => option.title.toLowerCase().includes(filterValue));
  }

  changeRecordType() {
    this.isStorage.set(!this.isStorage())
  }

  blockForCharacters(event: KeyboardEvent): void {
    const blocked = ['-', '.', ',', 'e', 'E', '+'];
    if (blocked.includes(event.key)) {
      event.preventDefault();
    }
  }

  onMangaSubmit() {
    if (this.storageform.valid) {
      const formData = this.storageform.value;

      const dto: StorageDto = {
        id: "",
        title: formData.title!,
        imgUrl: formData.imgUrl!,
        volume: Number(formData.volume!),
        count: Number(formData.count!),
        price: Number(formData.price!),
      }
      console.log(dto);
      this.storageService.addStorage(dto).subscribe({
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

  onBundleSubmit() {
    if (this.bundleform.valid) {
      const formData = this.bundleform.value;

      const dto: BundleDto = {
        id: "",
        title: formData.title!,
        imgUrl: formData.imgUrl!,
        books: formData.books!,
        price: Number(formData.price!),
      }
      console.log(dto);
      this.bundleService.addBundle(dto).subscribe({
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

  increaseCount(item: StorageDto) {
    item.count++;
    this.storageService.updateStorage(item.id, item).subscribe({
      next: (res) => {
        console.log('Product created:', res);
      },
      error: (err) => {
        console.error('Failed to create product:', err);

        console.error('Validation details:', err.error.errors);
      }
    });
  }

  decreaseCount(item: StorageDto) {
    item.count--;
    this.storageService.updateStorage(item.id, item).subscribe({
      next: (res) => {
        console.log('Product created:', res);
      },
      error: (err) => {
        console.error('Failed to create product:', err);

        console.error('Validation details:', err.error.errors);
      }
    });
  }

  toogleSingleBook() {
    this.singleBookCollapsed = !this.singleBookCollapsed;
  }

  toogleBundle() {
    this.bundleCollapsed = !this.bundleCollapsed;
  }

  toogleAdd() {
    this.addbundle = !this.addbundle;
  }

  increaseBundle(item: BundleDto) {
    item.books.forEach(book => {
      this.increaseBookInBundle(book);
    });
  }

  increaseBookInBundle(id: string) {
    const book = this.storageList().find(b => b.id === id);
    if (book) {
      book.count++;
      this.storageService.updateStorage(book.id, book).subscribe({
      next: (res) => {
        console.log('Product created:', res);
      },
      error: (err) => {
        console.error('Failed to create product:', err);

        console.error('Validation details:', err.error.errors);
      }
    });
    } else {
      console.warn(`Book with ID "${id}" not found.`);
    }
  }

  decreaseBundle(item: BundleDto) {

  }
}
