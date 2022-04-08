import { Component, OnInit } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';
import { StoreService } from '../../services/store.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total: number = 0;
  products: Product[] = []
  productChoosen: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    description: '',
    category: {
      id: 0,
      name: '',
      typeImg: ''
    },
  };
  limit: number = 10;
  offset: number = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init'
  showProductDetail: boolean = false;
  today = new Date();
  date = new Date(2022, 1, 22);
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getMyShoppingCart()
  }

  ngOnInit(): void {
    this.getData()
  }
  onAddToShoppingCart(product: Product): void {
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal()
  }
  toggleProductDetail(): void {
    this.showProductDetail = !this.showProductDetail
  }
  onShowDetail(id: string): void {
    this.statusDetail = 'loading'
    this.productsService.getProduct(id)
      .subscribe(data => {
        this.toggleProductDetail()
        this.productChoosen = data
        this.statusDetail = 'success'
      }, errorMsg => {
        window.alert(errorMsg)
        this.statusDetail = 'error'
      })
  }

  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
      .pipe(
        switchMap((product) => this.productsService.update(product.id, { title: 'change' })),
      )
      .subscribe(data => {
        console.log(data);
      })
    this.productsService.fetchReadAndUpdate(id, { title: 'change' })
      .subscribe(response => {
        const read = response[0]
        const update = response[1]
      })
  }
  createNewProduct(): void {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      price: 120,
      images: ['https://placeimg.com/640/480/any'],
      description: 'Raaaa',
      categoryId: 2

    }
    this.productsService.create(product)
      .subscribe(data => {
        this.products.unshift(data)
      })
  }
  updateProduct(): void {
    const changes: UpdateProductDTO = {
      title: 'Change Title',
    }
    const id = this.productChoosen.id
    this.productsService.update(id, changes)
      .subscribe(data => {
        const productIndex = this.products.findIndex(item => item.id === id)
        this.products[productIndex] = data
        this.productChoosen = data
      })
  }
  deleteProduct() {
    const id = this.productChoosen.id;
    this.productsService.delete(id)
      .subscribe(() => {
        this.products.splice(this.products.findIndex(item => item.id === id), 1)
      })
  }
  getData() {
    this.productsService.getAllProducts(10, 0)
      .subscribe(data => {
        this.products = data;
        this.offset += this.limit;
      });
  }
  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data)
        this.offset += this.limit
      })
  }
}
