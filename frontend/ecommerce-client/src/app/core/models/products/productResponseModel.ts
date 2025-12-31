import { baseProductViewModel } from "./baseProductViewModel";

export class productResponseModel extends baseProductViewModel{
    id: number;

    constructor(id:number, productName:string, unitPrice:number, categoryId: number){
        super(productName, unitPrice, categoryId);
        this.id = id;
    }
}