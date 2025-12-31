import { baseProductViewModel } from "./baseProductViewModel";

export class createProductRequestModel extends baseProductViewModel{

    constructor(productName:string, unitPrice:number, categoryId: number){
        super(productName, unitPrice, categoryId);
    }
}