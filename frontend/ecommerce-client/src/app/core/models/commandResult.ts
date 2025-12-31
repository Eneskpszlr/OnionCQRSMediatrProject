export class CommandResult {
    success: boolean;
    message: string;
    entityId?: number; // Nullable olabilir (int?)
    errors?: string[];

    constructor() {
        this.success = false;
        this.message = '';
        this.errors = [];
    }
}