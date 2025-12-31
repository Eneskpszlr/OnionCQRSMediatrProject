export abstract class baseOrderViewModel{
    shippingAddress:string;
    appUserId:number;

    constructor(shippingAddress:string, appUserId: number){
        this.shippingAddress = shippingAddress;
        this.appUserId = appUserId;
    }
}