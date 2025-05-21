export class OrderDto{
    address: string = '';
    items: OrderItem[] = [];
    totalPrice: number = 0;
}

export class OrderItem{
    productId: string = '';
    productName: string = '';
    count: number = 0;
    price: number = 0;
}