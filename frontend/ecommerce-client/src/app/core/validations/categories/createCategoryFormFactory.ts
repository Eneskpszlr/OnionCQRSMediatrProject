import { FormGroup } from "@angular/forms";
import { CreateCategoryRequestModel } from "../../models/categories/createCategoryRequestModel";
import { baseCategoryForm, BaseCategoryForm } from "./baseCategoryFormFactory";

export type CreateCategoryForm = FormGroup<BaseCategoryForm>;

export function createCategoryForm(): CreateCategoryForm {
    return new FormGroup(baseCategoryForm());
}

export function toCreateCategoryRequest(form: CreateCategoryForm): CreateCategoryRequestModel {
    const raw = form.getRawValue();
    // Description null ise boş string gönderelim
    return new CreateCategoryRequestModel(raw.categoryName, raw.description ?? "");
}