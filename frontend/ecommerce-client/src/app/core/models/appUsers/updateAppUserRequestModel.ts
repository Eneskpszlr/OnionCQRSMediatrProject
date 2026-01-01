import { baseAppUserViewModel } from "./baseAppUserViewModel";

export class updateAppUserRequestModel extends baseAppUserViewModel {
    id: number;

    constructor(id: number, userName: string) {
        super(userName);
        this.id = id;
    }
}