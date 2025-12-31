import { BaseCategoryViewModel } from "./baseCategoryViewModel";

export class CreateCategoryRequestModel extends BaseCategoryViewModel {
    constructor(categoryName: string, description: string) {
        super(categoryName, description);
    }
}