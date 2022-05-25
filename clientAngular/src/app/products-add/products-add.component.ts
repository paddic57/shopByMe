import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostProductDto } from '../models/post-product';
import { ProductsServiceService } from '../products-service.service';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {

  productForm: FormGroup
  product: PostProductDto = new PostProductDto()

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductsServiceService,
    private formBuilder: FormBuilder) { 
      this.productForm = this.formBuilder.group({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required)
      })
    }
  onSubmit(): void{
    if(this.productForm.status == 'VALID'){
      this.productService.post(this.productForm.value).subscribe({next: x =>{
        this.router.navigateByUrl("products")
      }
      , error: error =>{
        console.log(error)
      }
      })
  }
  }

  ngOnInit(): void {
  }

}
