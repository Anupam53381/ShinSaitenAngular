import { TestSetFileValidationRules } from "./test_set_file_validation_rules";
import { ValidationFailErrorCode } from "./validation_fail_error_code";

export class RowValidator {

    public validateRow(value: any): string {
        if (!value) {
            return ValidationFailErrorCode.EMPTY_ROW_ERROR_CODE;
        }
        if (value.length != TestSetFileValidationRules.CELL_LENGTH) {
            return ValidationFailErrorCode.ROW_SIZE_INVALID;
        }
        return ValidationFailErrorCode.SUCCESS_CODE;
    }

   






}