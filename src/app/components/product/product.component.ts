import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category, Product } from '../../models/product.model'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  category: Category = {
    id: 0,
    name: '',
    typeImg: ''
  };
  @Input() product: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    description: '',
    category: this.category,
  }
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();
  constructor() {
  }

  ngOnInit(): void {
  }
  onAddToCart() {
    this.addedProduct.emit(this.product);
  }
  onShowDetail() {
    this.showProduct.emit(this.product.id)
  }
}
