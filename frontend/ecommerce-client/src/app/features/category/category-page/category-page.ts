import { Component, signal, inject, OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/api/category-service';
import { CategoryResponseModel } from '../../../core/models/categories/categoryResponseModel';
import { createCategoryForm, toCreateCategoryRequest } from '../../../core/validations/categories/createCategoryFormFactory';
import { updateCategoryForm, toUpdateCategoryRequest } from '../../../core/validations/categories/updateCategoryFormFactory';

@Component({
  selector: 'app-category-operation',
  imports: [ReactiveFormsModule],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css',
})
export class CategoryOperation implements OnInit {
  private categoryService = inject(CategoryService);

  // Listeler ve Seçili Veri
  protected categories = signal<CategoryResponseModel[]>([]);
  protected selectedCategory = signal<CategoryResponseModel | null>(null);

  // Form Factory'den gelen formlar
  protected createForm = createCategoryForm();
  protected updateForm = updateCategoryForm();

  // Verileri Getir
  private async refreshCategories(): Promise<void> {
    try {
      const values = await this.categoryService.getAll();
      this.categories.set(values);
    } catch (error) {
      console.log("Kategori listesi alınamadı:", error);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.refreshCategories();
  }

  // --- CREATE ---
  async onCreate(): Promise<void> {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const req = toCreateCategoryRequest(this.createForm);
    await this.categoryService.create(req);
    
    this.createForm.reset();
    await this.refreshCategories();
  }

  // --- UPDATE ---
  startUpdate(cat: CategoryResponseModel) {
    this.selectedCategory.set(cat);
    
    this.updateForm.patchValue(
      {
        id: cat.id,
        categoryName: cat.categoryName,
        description: cat.description,
      },
      { emitEvent: false }
    );
  }

  cancelUpdate() {
    this.selectedCategory.set(null);
    this.updateForm.reset({ id: 0, categoryName: '', description: '' });
  }

  async onUpdate() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const req = toUpdateCategoryRequest(this.updateForm);
    await this.categoryService.update(req);
    
    this.cancelUpdate();
    await this.refreshCategories();
  }

  // --- DELETE ---
  async onDelete(id: number): Promise<void> {
    if (!window.confirm(`Id'si ${id} olan kategoriyi silmek istediğinize emin misiniz?`)) return;

    try {
      await this.categoryService.deleteById(id);
      
      // Optimistic Update (API'yi beklemeden UI'dan sil)
      this.categories.update((list) => list.filter((c) => c.id !== id));

      if (this.selectedCategory()?.id === id) {
        this.selectedCategory.set(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // --- ERROR HELPERS ---
  protected labels: Record<string, string> = {
    categoryName: 'Kategori Adı',
    description: 'Açıklama',
  };

  protected getErrorMessage(control: AbstractControl | null, label = 'Alan'): string | null {
    if (!control || !control.invalid) return null;
    if (control.hasError('required')) return `${label} zorunludur`;
    if (control.hasError('minlength')) return `${label} çok kısa`;
    return `${label} geçersiz`;
  }
}