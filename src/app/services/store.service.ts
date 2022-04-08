import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable()
  constructor() { }

  addProduct(product: Product): void {
    this.myShoppingCart.push(product)
    this.myCart.next(this.myShoppingCart)
  }
  getMyShoppingCart() {
    return this.myShoppingCart
  }
  getTotal(): number {
    return this.myShoppingCart.reduce((sum, item) =>
      sum + item.price, 0)
  }
}