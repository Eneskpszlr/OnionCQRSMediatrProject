import { baseOrderViewModel } from "./baseOrderViewModel";
import { OrderItemResponse } from "./orderTypes";

export class orderResponseModel extends baseOrderViewModel{
    id:number;
    appUserName: string;
    createdDate: Date;
    totalPrice: number;
    items: OrderItemResponse[];

    constructor(id:number, shippingAddress:string, appUserId: number, appUserName: string, createdDate: Date, totalPrice: number, items: OrderItemResponse[]){
        super(shippingAddress, appUserId);
        this.id = id;
        this.appUserName = appUserName;
        this.createdDate = createdDate;
        this.totalPrice = totalPrice;
        this.items = items;
    }
}