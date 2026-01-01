import { FormControl } from "@angular/forms";
import { OrderValidators } from "./orderValidators";

export type BaseOrderForm = {
    shippingAddress: FormControl<string>;
    appUserId: FormControl<number>;
};

export function baseOrderForm(): BaseOrderForm {
    return {
        shippingAddress: new FormControl<string>('', {
            nonNullable: true,
            validators: OrderValidators.shippingAddress()
        }),
        appUserId: new FormControl<number>(0, {
            nonNullable: true,
            validators: OrderValidators.appUserId()
        })
    };
}