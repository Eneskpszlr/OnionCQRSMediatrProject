import { Component, signal, inject, OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AppUserProfileService } from '../../../core/services/api/app-user-profile-service';
import { appUserProfileResponseModel } from '../../../core/models/appUserProfiles/appUserProfileResponseModel';
import { createAppUserProfileForm, toCreateAppUserProfileRequest } from '../../../core/validations/appUserProfiles/createAppUserProfileFormFactory';
import { updateAppUserProfileForm, toUpdateAppUserProfileRequest } from '../../../core/validations/appUserProfiles/updateAppUserProfileFormFactory';
import { AppUserService } from '../../../core/services/api/app-user-service';
import { appUserResponseModel } from '../../../core/models/appUsers/appUserResponseModel';

@Component({
  selector: 'app-user-profile-operation',
  imports: [ReactiveFormsModule],
  templateUrl: './app-user-profile-page.html',
  styleUrl: './app-user-profile-page.css',
})
export class AppUserProfileOperation implements OnInit {
  private appUserProfileService = inject(AppUserProfileService);
  private appUserService = inject(AppUserService);

  protected appUserProfiles = signal<appUserProfileResponseModel[]>([]);
  protected selectedProfile = signal<appUserProfileResponseModel | null>(null);

  protected users = signal<appUserResponseModel[]>([]);

  protected createForm = createAppUserProfileForm();
  protected updateForm = updateAppUserProfileForm();

  private async refreshProfiles(): Promise<void> {
    try {
      const [profilesData, usersData] = await Promise.all([
          this.appUserProfileService.getAll(),
          this.appUserService.getAll()
      ]);
      this.appUserProfiles.set(profilesData);
      this.users.set(usersData);
    } catch (error) {
      console.log("Profil listesi alınamadı:", error);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.refreshProfiles();
  }

  // --- CREATE ---
  async onCreate(): Promise<void> {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const req = toCreateAppUserProfileRequest(this.createForm);
    await this.appUserProfileService.create(req);
    
    this.createForm.reset();
    await this.refreshProfiles();
  }

  // --- UPDATE ---
  startUpdate(profile: appUserProfileResponseModel) {
    this.selectedProfile.set(profile);
    
    this.updateForm.patchValue(
      {
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
      },
      { emitEvent: false }
    );
  }

  cancelUpdate() {
    this.selectedProfile.set(null);
    this.updateForm.reset({ id: 0, firstName: '', lastName: '' });
  }

  async onUpdate() {
    // Teşhis için bu satırları ekle
    console.log("Form Durumu:", this.updateForm.status);
    console.log("Form Değerleri:", this.updateForm.getRawValue());
    console.log("Hatalar:", {
        id: this.updateForm.get('id')?.errors,
        firstName: this.updateForm.get('firstName')?.errors,
        lastName: this.updateForm.get('lastName')?.errors
    });

    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      alert("Form hatalı! Konsola bak."); // Uyarı versin
      return;
    }

    const req = toUpdateAppUserProfileRequest(this.updateForm);
    // Requesti görmüş olalım
    console.log("API'ye Giden Veri:", req); 
    
    await this.appUserProfileService.update(req);
    
    this.cancelUpdate();
    await this.refreshProfiles();
}

  // --- DELETE ---
  async onDelete(id: number): Promise<void> {
    if (!window.confirm(`Profil #${id} silinsin mi?`)) return;

    try {
      await this.appUserProfileService.deleteById(id);
      
      this.appUserProfiles.update((list) => list.filter((p) => p.id !== id));

      if (this.selectedProfile()?.id === id) {
        this.selectedProfile.set(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  protected labels: Record<string, string> = {
    firstName: 'Ad',
    lastName: 'Soyad',
  };

  protected getErrorMessage(control: AbstractControl | null, label = 'Alan'): string | null {
    if (!control || !control.invalid) return null;
    if (control.hasError('required')) return `${label} zorunludur`;
    if (control.hasError('minlength')) return `${label} çok kısa`;
    return `${label} geçersiz`;
  }
}