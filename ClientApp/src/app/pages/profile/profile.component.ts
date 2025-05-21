import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderDto } from '../../models/dtos/OrderDto';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  orderList = signal<Array<OrderDto>>([]);

  destroy$: Subject<void> = new Subject<void>;

  constructor(public authService: AuthService, private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {

    this.orderService.getMyOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_orders) => {
          this.orderList.set(_orders);
        }
      });

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
