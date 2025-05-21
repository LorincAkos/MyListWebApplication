import { Injectable } from '@angular/core';
import { OrderDto } from '../models/dtos/OrderDto';
import { BehaviorSubject } from 'rxjs';
import { BundleDto } from '../models/dtos/BundleDto';
import { StorageDto } from '../models/dtos/StorageDto';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private order: OrderDto = new OrderDto();
  private orderSubject = new BehaviorSubject<OrderDto>(new OrderDto());

  order$ = this.orderSubject.asObservable();

  constructor(private storageService: StorageService) {
    const stored = localStorage.getItem('order');
    if (stored) {
      this.order = JSON.parse(stored);
      this.orderSubject.next(this.order);
    }
  }

  private updateOrder() {
    this.orderSubject.next({ ...this.order });
    localStorage.setItem('order', JSON.stringify(this.order));
  }

  addItem(productId: string, productName: string, price: number, availableQuantity: number, count: number = 1) {
    const existing = this.order.items.find(i => i.productId === productId);

    const totalRequested = (existing?.count ?? 0) + count;
    if (totalRequested > availableQuantity) {
      alert(`Cannot add more than ${availableQuantity} units of ${productName}`);
      return;
    }

    if (existing) {
      existing.count += count;
    } else {
      this.order.items.push({ productId, productName, price, count });
    }
    this.updateOrder();
  }

  addBoundle(productId: string, productName: string, price: number,  count: number = 1) {
    const existing = this.order.items.find(i => i.productId === productId);

    if (existing) {
      existing.count += count;
    } else {
      this.order.items.push({ productId, productName, price, count });
    }
    this.updateOrder();
  }

  updateItemCount(productId: string,  count: number, availableQuantity: number) {
    const item = this.order.items.find(i => i.productId === productId);
    if (item) {
      if (count <= 0) {
        this.removeItem(productId);
      } else {
        const totalRequested = (item?.count ?? 0) + count;
        if (totalRequested > availableQuantity) {
          alert(`Cannot add more than ${availableQuantity} units.`);
          return;
        }
        item.count = count;
        this.updateOrder();
      }
    }
  }

  removeItem(productId: string) {
    this.order.items = this.order.items.filter(i => i.productId !== productId);
    this.updateOrder();
  }

  clearCart() {
    this.order = new OrderDto();
    this.updateOrder();
  }

  getTotal(): number {
    return this.order.items.reduce((sum, item) => sum + item.price * item.count, 0);
  }

  getOrder(): OrderDto {
    return this.order;
  }

  buildStorageUsageMap(cart: OrderDto, bundles: BundleDto[]): Map<string, number> {
    const usageMap = new Map<string, number>();

    const bundleMap = new Map<string, BundleDto>();
    for (const b of bundles) {
      bundleMap.set(b.id, b);
    }

    for (const item of cart.items) {
      const productId = item.productId;

      if (bundleMap.has(productId)) {
        // It's a bundle
        const books = bundleMap.get(productId)!.books;
        for (const bookId of books) {
          usageMap.set(bookId, (usageMap.get(bookId) || 0) + item.count);
        }
      } else {
        // It's an individual book
        usageMap.set(productId, (usageMap.get(productId) || 0) + item.count);
      }
    }

    return usageMap;
  }

  canAddBundle(bundle: BundleDto, storageList: StorageDto[], cart: OrderDto, bundles: BundleDto[]): boolean {
    const usageMap = this.buildStorageUsageMap(cart, bundles);

    for (const bookId of bundle.books) {
      const storage = storageList.find(s => s.id === bookId);
      if (!storage) continue;

      const used = usageMap.get(bookId) || 0;
      if (storage.count - used <= 0) {
        return false;
      }
    }

    return true;
  }

  canAddStingleItemToCart(
  storageId: string,
  storageList: StorageDto[],
  cart: OrderDto,
  bundles: BundleDto[],
  additionalCount: number = 1
): number {
  const storage = storageList.find(s => s.id === storageId);
  if (!storage) return 0;

  const totalAvailable = storage.count;

  // Map for quick bundle lookup
  const bundleMap = new Map<string, BundleDto>();
  for (const b of bundles) {
    bundleMap.set(b.id, b);
  }

  // Count how much of this storageId is already used in the cart
  let usedCount = 0;

  for (const item of cart.items) {
    const productId = item.productId;

    if (bundleMap.has(productId)) {
      const books = bundleMap.get(productId)!.books;
      if (books.includes(storageId)) {
        usedCount += item.count;
      }
    } else {
      if (productId === storageId) {
        usedCount += item.count;
      }
    }
  }

  return Math.max(0, totalAvailable - usedCount);
}

logAndUpdateAvailableCountsFromCart(
  storageList: StorageDto[],
  cart: OrderDto,
  bundles: BundleDto[]
): void {
  const bundleMap = new Map<string, BundleDto>();
  for (const b of bundles) {
    bundleMap.set(b.id, b);
  }

  const checkedStorageIds = new Set<string>();

  for (const item of cart.items) {
    const productId = item.productId;

    if (bundleMap.has(productId)) {
      // It's a bundle — check each book
      const books = bundleMap.get(productId)!.books;
      for (const bookId of books) {
        if (!checkedStorageIds.has(bookId)) {
          this.processStorageUpdate(bookId, storageList, cart, bundles);
          checkedStorageIds.add(bookId);
        }
      }
    } else {
      // It's an individual item
      if (!checkedStorageIds.has(productId)) {
        this.processStorageUpdate(productId, storageList, cart, bundles);
        checkedStorageIds.add(productId);
      }
    }
  }
}

private processStorageUpdate(
  storageId: string,
  storageList: StorageDto[],
  cart: OrderDto,
  bundles: BundleDto[]
): void {
  const available = this.canAddStingleItemToCart(storageId, storageList, cart, bundles);
  const original = storageList.find(s => s.id === storageId);
  if (!original) return;

  const updatedStorage: StorageDto = {
    ...original,
    count: available // WARNING: only if you're sure you want to overwrite actual inventory
  };

  this.storageService.updateStorage(updatedStorage.id,updatedStorage).subscribe({
    next: () => console.log(`Updated storage for ${storageId}: count = ${available}`),
    error: err => console.error(`Failed to update ${storageId}:`, err)
  });
}
}
