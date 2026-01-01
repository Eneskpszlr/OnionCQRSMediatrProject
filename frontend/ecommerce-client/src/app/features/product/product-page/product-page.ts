import { Component, signal, inject, OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/api/product-service';
import { CategoryService } from '../../../core/services/api/category-service';
import { productResponseModel } from '../../../core/models/products/productResponseModel';
import { CategoryResponseModel } from '../../../core/models/categories/categoryResponseModel';
import { createProductForm, toCreateProductRequest } from '../../../core/validations/products/createProductFormFactory';
import { updateProductForm, toUpdateProductRequest } from '../../../core/validations/products/updateProductFormFactory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-operation',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductOperation implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService); // Kategorileri çekmek için

  // Listelerimiz (Signal)
  protected products = signal<productResponseModel[]>([]);
  protected categories = signal<CategoryResponseModel[]>([]); // Dropdown verisi
  
  protected selectedProduct = signal<productResponseModel | null>(null);

  // Factory'den gelen formlar
  protected createForm = createProductForm();
  protected updateForm = updateProductForm();

  // Verileri Çekme
  private async loadData(): Promise<void> {
    try {
      const [productsData, categoriesData] = await Promise.all([
        this.productService.getAll(),
        this.categoryService.getAll()
      ]);

      this.products.set(productsData);
      this.categories.set(categoriesData);
    } catch (error) {
      console.log("Veriler alınamadı:", error);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  // Create İşlemi
  async onCreate(): Promise<void> {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const req = toCreateProductRequest(this.createForm);
    await this.productService.create(req);
    
    this.createForm.reset({ unitPrice: 0, categoryId: 0 }); // Default değerlerle sıfırla
    
    // Sadece ürünleri yenilemek yeterli
    const newProducts = await this.productService.getAll();
    this.products.set(newProducts);
  }

  // Update Başlatma
  startUpdate(prod: productResponseModel) {
    this.selectedProduct.set(prod);
    
    // Formu doldur
    this.updateForm.patchValue(
      {
        id: prod.id,
        productName: prod.productName,
        unitPrice: prod.unitPrice,
        categoryId: prod.categoryId // Dropdown seçili gelir
      },
      { emitEvent: false }
    );
  }

  cancelUpdate() {
    this.selectedProduct.set(null);
    this.updateForm.reset({ id: 0, unitPrice: 0});
  }

  async onUpdate() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const req = toUpdateProductRequest(this.updateForm);
    await this.productService.update(req);
    this.cancelUpdate();
    
    const newProducts = await this.productService.getAll();
    this.products.set(newProducts);
  }

  // Delete İşlemi
  async onDelete(id: number): Promise<void> {
    if (!window.confirm(`Ürün #${id} silinsin mi?`)) return;

    try {
      await this.productService.deleteById(id);
      
      // Optimistic Update (API'ye gitmeden listeden sil)
      this.products.update((list) => list.filter((p) => p.id !== id));

      if (this.selectedProduct()?.id === id) {
        this.selectedProduct.set(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // --- HATA MESAJLARI HELPERS ---
  protected labels: Record<string, string> = {
    productName: 'Ürün Adı',
    price: 'Fiyat',
    categoryId: 'Kategori'
  };

  protected getErrorMessage(control: AbstractControl | null, label = 'Bu alan'): string | null {
    if (!control || (!control.touched && !control.dirty) || !control.invalid) return null;
    
    if (control.hasError('required')) return `${label} zorunludur`;
    if (control.hasError('min')) return `${label} geçerli bir değer olmalıdır`;
    if (control.hasError('minlength')) return `${label} çok kısa`;
    
    return `${label} geçersiz`;
  }

  protected getErrorMessageByName(form: { controls: Record<string, AbstractControl> }, controlName: string): string | null {
    const control = form.controls[controlName];
    const label = this.labels[controlName] ?? controlName;
    return this.getErrorMessage(control, label);
  }
}