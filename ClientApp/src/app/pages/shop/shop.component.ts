import { Component, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StorageDto } from '../../models/dtos/StorageDto';
import { MangaService } from '../../services/manga.service';
import { StorageService } from '../../services/storage.service';
import { BundleService } from '../../services/bundle.service';
import { BundleDto } from '../../models/dtos/BundleDto';
import { AuthService } from '../../services/auth.service';
import { PopUpService } from '../../services/pop-up.service';
import { OrderService } from '../../services/order.service';
import { OrderDto } from '../../models/dtos/OrderDto';
import { CartService } from '../../services/cart.service';

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
  totalItems: number = 0

  destroy$: Subject<void> = new Subject<void>;

  constructor(
    private orderService: OrderService,
    private mangaService: MangaService,
    private storageService: StorageService,
    private bundleService: BundleService,
    public authService: AuthService,
    private popupService: PopUpService,
    public cartService: CartService) { }

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

  bundleIsAvaiable(item: BundleDto): boolean {
    return item.books.every(bookId => {
      const book = this.storageList().find(b => b.id === bookId);
      return book !== undefined && book.count > 0;
    });
  }

  singleBookToCart(item: StorageDto) {
    // this.authService.getId()
    if (!this.authService.isLoggedIn()) {
      this.popupService.openLoginPopUp();
      console.log("Logout")
      return
    }

    this.cartService.addItem(item.id, item.title + ' Vol.' + item.volume, item.price, item.count);
    console.log(this.cartService.getOrder())
    this.totalItems = this.cartService.getOrder().items.length;

    // this.orderService.placeOrder(order).subscribe({
    //   next: () => alert('Order placed!'),
    //   error: err => console.error('Order error:', err)
    // });
  }

  bundleToCart(item: BundleDto) {
    if (!this.authService.isLoggedIn()) {
      this.popupService.openLoginPopUp();
      console.log("Logout")
      return
    }

    this.cartService.addBoundle(item.id, item.title, item.price);
    console.log(this.cartService.getOrder())
    this.totalItems = this.cartService.getOrder().items.length;
  }

  toCart(){
    this.popupService.openCartPopUp();
  }
}
