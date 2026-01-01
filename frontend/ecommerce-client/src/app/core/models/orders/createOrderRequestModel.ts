import { baseOrderViewModel } from "./baseOrderViewModel";
import { OrderItemRequest } from "./orderTypes";

export class createOrderRequestModel extends baseOrderViewModel{
    // Backend'deki List<OrderItemDto> karşılığı
    items: OrderItemRequest[];

    constructor(shippingAddress:string, appUserId: number, items: OrderItemRequest[]){
        super(shippingAddress, appUserId);
        this.items = items;
    }
}