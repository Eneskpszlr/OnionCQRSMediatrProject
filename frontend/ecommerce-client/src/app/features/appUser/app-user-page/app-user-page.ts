import { Component, signal, inject, OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AppUserService } from '../../../core/services/api/app-user-service';
import { appUserResponseModel } from '../../../core/models/appUsers/appUserResponseModel';
import { createAppUserForm, toCreateAppUserRequest } from '../../../core/validations/appUsers/createAppUserFormFactory';
import { updateAppUserForm, toUpdateAppUserRequest } from '../../../core/validations/appUsers/updateAppUserFormFactory';

@Component({
  selector: 'app-user-operation',
  imports: [ReactiveFormsModule],
  templateUrl: './app-user-page.html',
  styleUrl: './app-user-page.css',
})
export class AppUserOperation implements OnInit {
  private appUserService = inject(AppUserService);

  protected appUsers = signal<appUserResponseModel[]>([]);
  protected selectedAppUser = signal<appUserResponseModel | null>(null);

  protected createForm = createAppUserForm();
  protected updateForm = updateAppUserForm();

  private async refreshAppUsers(): Promise<void> {
    try {
      const values = await this.appUserService.getAll();
      this.appUsers.set(values);
    } catch (error) {
      console.log("Kullanıcı listesi alınamadı:", error);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.refreshAppUsers();
  }

  // --- CREATE ---
  async onCreate(): Promise<void> {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const req = toCreateAppUserRequest(this.createForm);
    await this.appUserService.create(req);
    
    this.createForm.reset();
    await this.refreshAppUsers();
  }

  // --- UPDATE ---
  startUpdate(user: appUserResponseModel) {
    this.selectedAppUser.set(user);
    
    // Update formunda sadece ID ve Username var (Password yok)
    this.updateForm.patchValue(
      {
        id: user.id,
        userName: user.userName
      },
      { emitEvent: false }
    );
  }

  cancelUpdate() {
    this.selectedAppUser.set(null);
    this.updateForm.reset({ id: 0, userName: '' });
  }

  async onUpdate() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const req = toUpdateAppUserRequest(this.updateForm);
    await this.appUserService.update(req);
    
    this.cancelUpdate();
    await this.refreshAppUsers();
  }

  // --- DELETE ---
  async onDelete(id: number): Promise<void> {
    if (!window.confirm(`Kullanıcı #${id} silinsin mi?`)) return;

    try {
      await this.appUserService.deleteById(id);
      
      this.appUsers.update((list) => list.filter((u) => u.id !== id));

      if (this.selectedAppUser()?.id === id) {
        this.selectedAppUser.set(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  protected labels: Record<string, string> = {
    userName: 'Kullanıcı Adı',
    password: 'Şifre',
  };

  protected getErrorMessage(control: AbstractControl | null, label = 'Bu alan'): string | null {
    // 1. Kontrol yoksa veya hata yoksa null dön
    if (!control || !control.errors) return null;

    // 2. Kullanıcı dokunmadıysa ve form daha submit edilmediyse hata gösterme (Optional)
    if (!control.touched && !control.dirty) return null;

    // 3. Hata kontrolü
    if (control.hasError('required')) 
        return `${label} zorunludur.`;
    
    if (control.hasError('minlength')) {
        const error = control.errors['minlength'];
        return `${label} en az ${error.requiredLength} karakter olmalıdır.`;
    }

    if (control.hasError('maxlength')) {
        const error = control.errors['maxlength'];
        return `${label} en fazla ${error.requiredLength} karakter olmalıdır.`;
    }

    return `${label} geçersiz.`;
}
}