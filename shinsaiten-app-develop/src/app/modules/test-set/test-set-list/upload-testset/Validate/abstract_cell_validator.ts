import { CellValidation } from "./cell_validation";
import { TestSetFileValidationRules } from "./test_set_file_validation_rules";
import { ValidationFailErrorCode } from "./validation_fail_error_code";
import { Validators } from "@angular/forms";

export class AbstractCellValidator implements CellValidation {

    validateCell(cellValue: string): string {
        
        var regex = new RegExp('^[a-zA-Z0-9 /._-]+$');
               
        if (cellValue.trim() === '') {
            return ValidationFailErrorCode.EMPTY_CELL_ERROR_CODE;
        }
        if (!(regex.test(cellValue.trim()))) {
            return ValidationFailErrorCode.INVALID_CHARCTER_ERROR_CODE;
        }
        if (cellValue.length > TestSetFileValidationRules.MAX_LENGHT) {
            return ValidationFailErrorCode.MAX_LENGTH_ERROR_CODE;
        }
        return ValidationFailErrorCode.SUCCESS_CODE;
    }
}