import { FormControl, FormGroup, Validators } from "@angular/forms";
import { updateAppUserProfileRequestModel } from "../../models/appUserProfiles/updateAppUserProfileRequestModel";
import { baseAppUserProfileForm, BaseAppUserProfileForm } from "./baseAppUserProfileFormFactory";

export type UpdateAppUserProfileForm = FormGroup<{ id: FormControl<number> } & BaseAppUserProfileForm>;

export function updateAppUserProfileForm(): UpdateAppUserProfileForm {
    const base = baseAppUserProfileForm();

    return new FormGroup({
        id: new FormControl<number>(0, {
            nonNullable: true,
            validators: [Validators.required, Validators.min(1)]
        }),
        ...base
    });
}

export function toUpdateAppUserProfileRequest(form: UpdateAppUserProfileForm): updateAppUserProfileRequestModel {
    const raw = form.getRawValue();
    
    return new updateAppUserProfileRequestModel(raw.id, raw.firstName, raw.lastName);
}