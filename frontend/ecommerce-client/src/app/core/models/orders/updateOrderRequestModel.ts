import { baseOrderViewModel } from "./baseOrderViewModel";

export class updateOrderRequestModel extends baseOrderViewModel{
    id:number;

    constructor(id:number, shippingAddress:string, appUserId: number){
        super(shippingAddress, appUserId);
        this.id = id;
    }
}