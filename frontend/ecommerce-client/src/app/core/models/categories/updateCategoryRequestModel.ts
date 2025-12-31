import { BaseCategoryViewModel } from "./baseCategoryViewModel";

export class UpdateCategoryRequestModel extends BaseCategoryViewModel {
    id: number;

    constructor(id: number, categoryName: string, description: string) {
        super(categoryName, description);
        this.id = id;
    }
}