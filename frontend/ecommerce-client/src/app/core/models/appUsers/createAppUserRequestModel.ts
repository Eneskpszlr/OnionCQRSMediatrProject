import { baseAppUserViewModel } from "./baseAppUserViewModel";

export class createAppUserRequestModel extends baseAppUserViewModel {
    password: string;

    constructor(userName: string, password: string) {
        super(userName);
        this.password = password;
    }
}