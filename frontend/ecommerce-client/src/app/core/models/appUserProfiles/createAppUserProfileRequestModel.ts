import { baseAppUserProfileViewModel } from "./baseAppUserProfileViewModel";

export class createAppUserProfileRequestModel extends baseAppUserProfileViewModel{
    constructor(firstName:string, lastName:string){
        super(firstName,lastName);
    }
}