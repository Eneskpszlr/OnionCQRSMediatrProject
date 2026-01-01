import { FormControl } from "@angular/forms";
import { appUserProfileValidators } from "./appUserProfileValidators";

export type BaseAppUserProfileForm = {
    firstName: FormControl<string>;
    lastName: FormControl<string>;
};

export function baseAppUserProfileForm(): BaseAppUserProfileForm {
    return {
        firstName: new FormControl<string>('', {
            nonNullable: true,
            validators: appUserProfileValidators.firstName()
        }),
        lastName: new FormControl<string>('', {
            nonNullable: true,
            validators: appUserProfileValidators.lastName()
        }),
    };
}