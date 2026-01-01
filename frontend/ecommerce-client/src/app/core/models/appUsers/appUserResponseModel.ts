import { baseAppUserViewModel } from "./baseAppUserViewModel";

export class appUserResponseModel extends baseAppUserViewModel {
    id: number;

    constructor(id: number, userName: string) {
        super(userName);
        this.id = id;
    }
}