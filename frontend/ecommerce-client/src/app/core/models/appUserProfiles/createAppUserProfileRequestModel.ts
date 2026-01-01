import { baseAppUserProfileViewModel } from "./baseAppUserProfileViewModel";

export class createAppUserProfileRequestModel extends baseAppUserProfileViewModel{
    appUserId: number;

    constructor(firstName:string, lastName:string, appUserId: number){
        super(firstName,lastName);
        this.appUserId = appUserId;
    }
}