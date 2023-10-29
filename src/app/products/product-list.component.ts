import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { filter } from 'rxjs';
import { ProductService } from './product.services';

@Component
({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit
{
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  private _listFilter: string = '';
  private _productService;

  constructor(private productService : ProductService)
  {
    this._productService = productService;
  }

  get listFilter()
  {
      return this._listFilter;
  }
  set listFilter(value: string)
  {
      this._listFilter = value;
      console.log('In setter', value);
      this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  performFilter(filterBy: string) : IProduct[]
  {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product:IProduct) =>
      product.productName.toLowerCase().includes(filterBy));
  }

  toggleImage(): void
  {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void 
  {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  onRatingClicked(message : string): void
  {
    this.pageTitle = 'Product List: ' + message;
  }
}