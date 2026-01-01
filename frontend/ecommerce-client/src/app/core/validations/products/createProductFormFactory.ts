import { FormGroup } from "@angular/forms";
import { createProductRequestModel } from "../../models/products/createProductRequestModel";
import { baseProductForm, BaseProductForm } from "./baseProductFormFactory";

export type CreateProductForm = FormGroup<BaseProductForm>;

export function createProductForm(): CreateProductForm {
    return new FormGroup(baseProductForm());
}

export function toCreateProductRequest(form: CreateProductForm): createProductRequestModel {
    const raw = form.getRawValue();
    return new createProductRequestModel(raw.productName, raw.unitPrice, raw.categoryId);
}