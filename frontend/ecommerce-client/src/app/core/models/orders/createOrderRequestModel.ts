import { baseOrderViewModel } from "./baseOrderViewModel";

export class createOrderRequestModel extends baseOrderViewModel{

    constructor(shippingAddress:string, appUserId: number){
        super(shippingAddress, appUserId);
    }
}