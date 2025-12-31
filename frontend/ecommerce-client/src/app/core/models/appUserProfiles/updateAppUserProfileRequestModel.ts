import { baseAppUserProfileViewModel } from "./baseAppUserProfileViewModel";

export class updateAppUserProfileRequestModel extends baseAppUserProfileViewModel{
    id:number;

    constructor(id:number, firstName:string, lastName:string){
        super(firstName,lastName);
        this.id = id;
    }
}