import { FormControl, FormGroup } from "@angular/forms";
import { createAppUserRequestModel } from "../../models/appUsers/createAppUserRequestModel";
import { baseAppUserForm, BaseAppUserForm } from "./baseAppUserFormFactory";
import { appUserValidators } from "./appUserValidators";

// BaseUserForm + Password
export type CreateAppUserForm = FormGroup<BaseAppUserForm & {
    password: FormControl<string>;
}>;

export function createAppUserForm(): CreateAppUserForm {
    const base = baseAppUserForm();

    return new FormGroup({
        ...base, // userName'i aldık
        password: new FormControl<string>('', {
            nonNullable: true,
            validators: appUserValidators.password()
        })
    });
}

export function toCreateAppUserRequest(form: CreateAppUserForm): createAppUserRequestModel {
    // Form value'larını modele çeviriyoruz
    return new createAppUserRequestModel(
        form.controls.userName.value,
        form.controls.password.value
    );
}