import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  orderForm: FormGroup;
  teaCard: TeaCard | null = null;
  private subscriptionOrder: Subscription | null = null;
  public responseSuccess :boolean = false;
  public errorMessage: string | null = null;
  public isSubmit :boolean = false;

  constructor(
      private fb: FormBuilder,
      private teaDataService: TeaDataService,
      private teaCatalogService: TeaCatalogService,
      private route: ActivatedRoute
  ) {
    this.orderForm = this.fb.group({}); // Инициализация пустой формы
  }

  ngOnInit(): void {
    this.initForm();
    this.setTeaProductValue();
  }

  private initForm(): void {
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
  }

  private setTeaProductValue(): void {
    // Обработка параметра из URL
    this.route.queryParams.subscribe(params => {
      if (params['tea']) {
        const teaName :string = decodeURIComponent(params['tea'].replace(/\+/g, ' '));
        this.orderForm.controls['product'].setValue(teaName);
      }
    });

    // Если нет параметра в URL, проверяем сервис
    if (!this.orderForm.value.product) {
      this.teaCard = this.teaDataService.getTeaCard();
      if (this.teaCard) {
        this.orderForm.controls['product'].setValue(this.teaCard.title);
      }
    }
  }

  onSubmit(): void {
    if (this.orderForm.invalid || this.isSubmit) {
      return;
    }

    this.isSubmit = true;
    this.errorMessage = null;

    const formData = {
      ...this.orderForm.value,
      product: this.orderForm.get('product')?.value
    };

    this.subscriptionOrder = this.teaCatalogService.createOrder(formData)
        .subscribe({
          next: () => {
            this.responseSuccess = true;
            this.isSubmit = false;
            this.orderForm.reset();
          },
          error: (err) => {
            this.errorMessage = err.message || 'Произошла ошибка при отправке заказа';
            this.isSubmit = false;
          }
        });
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

  get zip() {
    return this.orderForm.get('zip');
  }

  ngOnDestroy(): void {
    if (this.subscriptionOrder) {
      this.subscriptionOrder.unsubscribe();
    }
  }
}