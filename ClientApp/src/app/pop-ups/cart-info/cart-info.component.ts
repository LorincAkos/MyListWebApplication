import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BundleService } from '../../services/bundle.service';
import { CartService } from '../../services/cart.service';
import { MangaService } from '../../services/manga.service';
import { OrderService } from '../../services/order.service';
import { PopUpService } from '../../services/pop-up.service';
import { StorageService } from '../../services/storage.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OrderDto } from '../../models/dtos/OrderDto';
import { Subject, takeUntil } from 'rxjs';
import { StorageDto } from '../../models/dtos/StorageDto';
import { BundleDto } from '../../models/dtos/BundleDto';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-info',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,],
  templateUrl: './cart-info.component.html',
  styleUrl: './cart-info.component.scss'
})
export class CartInfoComponent {

  cartform = new FormGroup({
    address: new FormControl('', [
      Validators.required,
    ]),
  });

  cart = signal<OrderDto>(new OrderDto);
  storageList = signal<Array<StorageDto>>([]);
  bundleList = signal<Array<BundleDto>>([]);

  destroy$: Subject<void> = new Subject<void>;

  constructor(
    private orderService: OrderService,
    private mangaService: MangaService,
    private storageService: StorageService,
    private bundleService: BundleService,
    private authService: AuthService,
    private popupService: PopUpService,
    public cartService: CartService,
    private dialogRef: MatDialogRef<CartInfoComponent>) { }

  ngOnInit(): void {
    this.cart.set(this.cartService.getOrder());

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

  onCartSubmit() {
    if (this.cartform.valid) {
      const formData = this.cartform.value;

      if (this.cartService.getOrder().items.length > 0) {
        this.cart().address = formData.address!;
        this.cart().totalPrice = this.cartService.getTotal();
        console.log(this.cart());


        this.orderService.placeOrder(this.cart()).subscribe({
          next: () => alert('Order placed!'),
          error: err => console.error('Order error:', err)
        });
        this.cartService.logAndUpdateAvailableCountsFromCart(this.storageList(), this.cart(), this.bundleList());

        this.cartService.clearCart();
        this.dialogRef.close();
      }
    } else {
      console.warn('Form is invalid');
    }
  }




}
