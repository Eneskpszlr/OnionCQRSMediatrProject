import { baseOrderViewModel } from "./baseOrderViewModel";
import { OrderItemRequest } from "./orderTypes";

export class updateOrderRequestModel extends baseOrderViewModel{
    id:number;
    // Güncellenecek ürün listesi
    items: OrderItemRequest[];

    constructor(id:number, shippingAddress:string, appUserId: number, items:OrderItemRequest[]){
        super(shippingAddress, appUserId);
        this.id = id;
        this.items = items;
    }
}