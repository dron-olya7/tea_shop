import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TeaCatalogService } from 'src/app/shared/services/tea-catalog.service';
import { TeaDataService } from 'src/app/shared/services/tea-data.service';
import { TeaCard } from 'src/app/shared/types/tea-card.type';
import { addressValidator, lettersOnlyValidator, phoneValidator } from 'src/app/shared/validators/custom-validators';



@Component({
  selector: 'create-order-component',
  templateUrl: '../create-order/create-order.component.html',
  styleUrls: ['../create-order/create-order.component.scss']
})
export class CreateOrderComponent implements OnInit, OnDestroy {
  orderForm!: FormGroup;
  teaCard: TeaCard | null = null;
  private subscriptionOrder: Subscription | null = null;
  public responseSuccess = false;
  public errorMessage: string | null = null;
  public isSubmit = false;

  constructor(private fb: FormBuilder,
    private teaDataService: TeaDataService,
    private teaCatalogService: TeaCatalogService
  ) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      product: [{ value: '', disabled: true }],
      comment: [''],
      name: ['', [Validators.required, lettersOnlyValidator()]],
      last_name: ['', [Validators.required, lettersOnlyValidator()]],
      phone: ['', [Validators.required, phoneValidator()]],
      country: ['', [Validators.required, lettersOnlyValidator()]],
      zip: ['', Validators.required],
      address: ['', [Validators.required, addressValidator()]]
    });
    this.teaCard = this.teaDataService.getTeaCard();
    if (this.teaCard) {
      this.orderForm.controls['product'].setValue(this.teaCard.title);
    }
  }
  onSubmit(): void {
    if (this.orderForm.valid) {
      this.isSubmit = true;
      // если тут заюлокировать то ответ с бэка будет 0 и можно увидеть реализацию исчезающго ссобщения об ошибки
      this.orderForm.controls['product'].enable();
      const orderData = this.orderForm.value;
      this.subscriptionOrder = this.teaCatalogService.createOrder(orderData).subscribe({
        next: (response) => {
          if (response.success) {
            this.responseSuccess = true;
            this.orderForm.reset();
          } else {
            this.setErrorMessage('Произошла ошибка. Попробуйте еще раз.');
          }
        },
        error: (error) => {
          this.errorMessage = 'Произошла ошибка. Попробуйте еще раз.';
        },
        complete: () => {
          this.isSubmit = false;
          this.orderForm.controls['product'].disable();
        }
      });
    }
  }
  get name() {
    return this.orderForm.get('name');
  }
  get lastName() {
    return this.orderForm.get('last_name');
  }
  get phone() {
    return this.orderForm.get('phone');
  }
  get country() {
    return this.orderForm.get('country');
  }
  get address() {
    return this.orderForm.get('address');
  }

  ngOnDestroy(): void {
    if (this.subscriptionOrder) {
      this.subscriptionOrder.unsubscribe();
    }

  }
  private setErrorMessage(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
      this.orderForm.reset();
    },
      3000

    )
  }

}
