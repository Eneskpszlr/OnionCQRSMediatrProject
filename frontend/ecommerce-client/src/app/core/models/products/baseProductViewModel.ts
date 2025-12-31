export abstract class baseProductViewModel{
    productName:string;
    unitPrice:number;
    categoryId:number;

    constructor(productName:string, unitPrice:number, categoryId: number){
        this.productName = productName;
        this.unitPrice = unitPrice;
        this.categoryId = categoryId;
    }
}