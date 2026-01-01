import { baseAppUserProfileViewModel } from "./baseAppUserProfileViewModel";

export class appUserProfileResponseModel extends baseAppUserProfileViewModel{
    id:number;
    appUserId: number;

    constructor(id:number, firstName:string, lastName:string, appUserId: number){
        super(firstName,lastName);
        this.id = id;
        this.appUserId = appUserId;
    }
}