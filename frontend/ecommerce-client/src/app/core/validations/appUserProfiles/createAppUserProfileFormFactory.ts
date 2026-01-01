import { FormControl, FormGroup, Validators } from "@angular/forms";
import { createAppUserProfileRequestModel } from "../../models/appUserProfiles/createAppUserProfileRequestModel";
import { baseAppUserProfileForm, BaseAppUserProfileForm } from "./baseAppUserProfileFormFactory";

// Base yapıya + appUserId ekliyoruz
export type CreateAppUserProfileForm = FormGroup<BaseAppUserProfileForm & {
    appUserId: FormControl<number>;
}>;

export function createAppUserProfileForm(): CreateAppUserProfileForm {
    const base = baseAppUserProfileForm();

    return new FormGroup({
        ...base,
        appUserId: new FormControl<number>(0, {
            nonNullable: true,
            validators: [Validators.required, Validators.min(1)]
        })
    });
}

export function toCreateAppUserProfileRequest(form: CreateAppUserProfileForm): createAppUserProfileRequestModel {
    const raw = form.getRawValue();
    return new createAppUserProfileRequestModel(raw.firstName, raw.lastName, raw.appUserId);
}