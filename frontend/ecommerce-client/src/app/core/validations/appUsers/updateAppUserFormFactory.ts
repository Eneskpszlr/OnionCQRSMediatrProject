import { FormControl, FormGroup, Validators } from "@angular/forms";
import { updateAppUserRequestModel } from "../../models/appUsers/updateAppUserRequestModel";
import { baseAppUserForm, BaseAppUserForm } from "./baseAppUserFormFactory";

export type UpdateAppUserForm = FormGroup<{ id: FormControl<number> } & BaseAppUserForm>;

export function updateAppUserForm(): UpdateAppUserForm {
    const base = baseAppUserForm();

    return new FormGroup({
        id: new FormControl<number>(0, {
            nonNullable: true,
            validators: [Validators.required, Validators.min(1)]
        }),
        ...base
    });
}

export function toUpdateAppUserRequest(form: UpdateAppUserForm): updateAppUserRequestModel {
    return new updateAppUserRequestModel(
        form.controls.id.value,
        form.controls.userName.value
    );
}