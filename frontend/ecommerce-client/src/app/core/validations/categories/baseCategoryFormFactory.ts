import { FormControl } from "@angular/forms";
import { CategoryValidators } from "./categoryValidators";

export type BaseCategoryForm = {
    categoryName: FormControl<string>;
    description: FormControl<string | null>; // Null olabilir
};

export function baseCategoryForm(): BaseCategoryForm {
    return {
        categoryName: new FormControl<string>('', {
            nonNullable: true,
            validators: CategoryValidators.categoryName()
        }),
        description: new FormControl<string | null>(null, {
            validators: CategoryValidators.description()
        })
    };
}