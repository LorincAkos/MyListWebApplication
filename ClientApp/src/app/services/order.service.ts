import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { OrderDto } from '../models/dtos/OrderDto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService: HttpService) { }

  placeOrder(order: OrderDto): Observable<any> {
    return this.httpService.placeOrder(order);
  }

  getMyOrders(): Observable<OrderDto[]> {
    return this.httpService.getMyOrders();
  }
}
