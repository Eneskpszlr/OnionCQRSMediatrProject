export abstract class baseAppUserProfileViewModel{
    firstName: string;
    lastName: string;

    constructor(firstName:string, lastName: string){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}