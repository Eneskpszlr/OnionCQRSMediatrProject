import { baseAppUserProfileViewModel } from "./baseAppUserProfileViewModel";

export class appUserProfileResponseModel extends baseAppUserProfileViewModel{
    id:number;

    constructor(id:number, firstName:string, lastName:string){
        super(firstName,lastName);
        this.id = id;
    }
}