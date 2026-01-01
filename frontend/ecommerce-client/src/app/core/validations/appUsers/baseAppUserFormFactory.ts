import { FormControl } from "@angular/forms";
import { appUserValidators } from "./appUserValidators";

// Create ve Update arasındaki ortak alanlar
export type BaseAppUserForm = {
    userName: FormControl<string>;
};

export function baseAppUserForm(): BaseAppUserForm {
    return {
        userName: new FormControl<string>('', { 
            nonNullable: true, 
            validators: appUserValidators.userName() 
        })
    };
}