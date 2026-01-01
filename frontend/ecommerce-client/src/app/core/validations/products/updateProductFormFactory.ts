import { FormControl, FormGroup, Validators } from "@angular/forms";
import { updateProductRequestModel } from "../../models/products/updateProductRequestModel";
import { baseProductForm, BaseProductForm } from "./baseProductFormFactory";

export type UpdateProductForm = FormGroup<{ id: FormControl<number> } & BaseProductForm>;

export function updateProductForm(): UpdateProductForm {
    const base = baseProductForm();

    return new FormGroup({
        id: new FormControl<number>(0, {
            nonNullable: true,
            validators: [Validators.required, Validators.min(1)]
        }),
        ...base
    });
}

export function toUpdateProductRequest(form: UpdateProductForm): updateProductRequestModel {
    const raw = form.getRawValue();
    return new updateProductRequestModel(raw.id, raw.productName, raw.unitPrice, raw.categoryId);
}