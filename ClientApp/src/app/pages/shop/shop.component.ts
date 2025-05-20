import { Component, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StorageDto } from '../../models/dtos/StorageDto';
import { MangaService } from '../../services/manga.service';
import { StorageService } from '../../services/storage.service';
import { BundleService } from '../../services/bundle.service';
import { BundleDto } from '../../models/dtos/BundleDto';

@Component({
  selector: 'app-shop',
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  storageList = signal<Array<StorageDto>>([]);
  bundleList = signal<Array<BundleDto>>([]);

  singleBookCollapsed = true;
  bundleCollapsed = true;

  destroy$: Subject<void> = new Subject<void>;

  constructor(private mangaService: MangaService, private storageService: StorageService, private bundleService: BundleService) { }

  ngOnInit(): void {

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

  toogleSingleBook() {
    this.singleBookCollapsed = !this.singleBookCollapsed;
  }

  toogleBundle() {
    this.bundleCollapsed = !this.bundleCollapsed;
  }

  bundleIsAvaiable(item: BundleDto): boolean{
    return item.books.every(bookId => {
    const book = this.storageList().find(b => b.id === bookId);
    return book !== undefined && book.count > 0;
  });
  }
}
