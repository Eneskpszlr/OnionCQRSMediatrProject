import { Component, signal, inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/api/order-service';
import { ProductService } from '../../../core/services/api/product-service';
import { AppUserService } from '../../../core/services/api/app-user-service';
import { orderResponseModel } from '../../../core/models/orders/orderResponseModel';
import { productResponseModel } from '../../../core/models/products/productResponseModel';
import { appUserResponseModel } from '../../../core/models/appUsers/appUserResponseModel';

// Factory Importları
import { createOrderForm, toCreateOrderRequest } from '../../../core/validations/orders/createOrderFormFactory';
import { updateOrderForm, toUpdateOrderRequest } from '../../../core/validations/orders/updateOrderFormFactory';
import { createOrderItemForm } from '../../../core/validations/orders/orderItemFormFactory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-operation',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order-page.html',
  styleUrl: './order-page.css',
})
export class OrderOperation implements OnInit {
  private orderService = inject(OrderService);
  private productService = inject(ProductService);
  private appUserService = inject(AppUserService);

  // UI State Signals
  protected orders = signal<orderResponseModel[]>([]);
  protected products = signal<productResponseModel[]>([]);
  protected appUsers = signal<appUserResponseModel[]>([]);
  
  protected selectedOrder = signal<orderResponseModel | null>(null);

  // Formlar
  protected createForm = createOrderForm();
  protected updateForm = updateOrderForm();

  async ngOnInit(): Promise<void> {
    await this.refreshAllData();
  }

  private async refreshAllData(): Promise<void> {
    try {
      const [ordersData, productsData, appUsersData] = await Promise.all([
        this.orderService.getAll(),
        this.productService.getAll(),
        this.appUserService.getAll()
      ]);
      
      this.orders.set(ordersData);
      this.products.set(productsData);
      this.appUsers.set(appUsersData);
    } catch (e) {
      console.log("Veri hatası", e);
    }
  }
  
  // Create Formundaki 'items' dizisi
  get createItemsArray(): FormArray {
    return this.createForm.get('items') as FormArray;
  }

  // Update Formundaki 'items' dizisi
  get updateItemsArray(): FormArray {
    return this.updateForm.get('items') as FormArray;
  }

  // Yeni satır ekleme (HTML butonundan çağrılır)
  addItemToCreate() {
    this.createItemsArray.push(createOrderItemForm());
  }

  removeItemFromCreate(index: number) {
    this.createItemsArray.removeAt(index);
  }

  addItemToUpdate() {
    this.updateItemsArray.push(createOrderItemForm());
  }

  removeItemFromUpdate(index: number) {
    this.updateItemsArray.removeAt(index);
  }
  // ----------------------------------------------------------------

  async onCreate(): Promise<void> {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const req = toCreateOrderRequest(this.createForm);
    await this.orderService.create(req);

    // Formu resetle ve başlangıç haline (1 boş satır) getir
    this.createForm.reset();
    this.createItemsArray.clear();
    this.addItemToCreate();

    const newOrders = await this.orderService.getAll();
    this.orders.set(newOrders);
  }

  startUpdate(order: orderResponseModel) {
    this.selectedOrder.set(order);

    // 1. Önce eski form array'i temizle
    this.updateItemsArray.clear();

    // 2. Siparişteki her ürün için form array'e yeni bir grup ekle ve doldur
    order.items.forEach(item => {
      const group = createOrderItemForm(); // Factory'den boş grup al
      group.patchValue({
        productId: item.productId,
        quantity: item.quantity
      });
      this.updateItemsArray.push(group);
    });

    // 3. Header bilgilerini doldur
    this.updateForm.patchValue({
      id: order.id,
      shippingAddress: order.shippingAddress,
      appUserId: order.appUserId
    });
  }

  cancelUpdate() {
    this.selectedOrder.set(null);
    this.updateForm.reset();
    this.updateItemsArray.clear();
  }

  async onUpdate() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const req = toUpdateOrderRequest(this.updateForm);
    await this.orderService.update(req);
    
    this.cancelUpdate();
    
    const newOrders = await this.orderService.getAll();
    this.orders.set(newOrders);
  }

  async onDelete(id: number): Promise<void> {
    if (!confirm('Siparişi silmek istediğinize emin misiniz?')) return;

    try {
      await this.orderService.deleteById(id);
      this.orders.update(list => list.filter(o => o.id !== id));
      
      if (this.selectedOrder()?.id === id) {
        this.selectedOrder.set(null);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // --- HATA MESAJLARI ---
  protected labels: Record<string, string> = {
    shippingAddress: 'Teslimat Adresi',
    appUserId: 'Kullanıcı',
    items: 'Ürün Listesi'
  };

  // Basit hata mesajı
  protected getErrorMessage(control: AbstractControl | null, label = 'Alan'): string | null {
    if (!control || !control.invalid) return null;
    if (control.hasError('required')) return `${label} zorunludur`;
    if (control.hasError('min')) return `${label} en az 1 olmalı`;
    return `${label} hatalı`;
  }
}