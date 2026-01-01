import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UpdateCategoryRequestModel } from "../../models/categories/updateCategoryRequestModel";
import { baseCategoryForm, BaseCategoryForm } from "./baseCategoryFormFactory";

export type UpdateCategoryForm = FormGroup<{ id: FormControl<number> } & BaseCategoryForm>;

export function updateCategoryForm(): UpdateCategoryForm {
    const base = baseCategoryForm();

    return new FormGroup({
        id: new FormControl<number>(0, {
            nonNullable: true,
            validators: [Validators.required, Validators.min(1)]
        }),
        ...base
    });
}

export function toUpdateCategoryRequest(form: UpdateCategoryForm): UpdateCategoryRequestModel {
    const raw = form.getRawValue();
    return new UpdateCategoryRequestModel(raw.id, raw.categoryName, raw.description ?? "");
}