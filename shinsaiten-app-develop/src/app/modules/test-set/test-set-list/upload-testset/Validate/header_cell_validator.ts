import { AbstractCellValidator } from "./abstract_cell_validator";
import { ValidationFailErrorCode } from "./validation_fail_error_code";
import { TestSetFileValidationRules } from "./test_set_file_validation_rules";

export interface HeaderCellValidator {

  validateCell(value: any, cellPosition: any): string;


}

export class HeaderCellValidatorImpl implements HeaderCellValidator {

  public HeaderName = TestSetFileValidationRules.HEADER_NAMES;


  validateCell(value: any, cellPosition: any): string {

    if (value.trim() === '') {
      return ValidationFailErrorCode.EMPTY_HEADER_CELL_ERROR_CODE;
    }
    /*Validate Header Name*/
    if (this.HeaderName.indexOf(value.trim()) !== cellPosition) {
      return ValidationFailErrorCode.HEADER_NAME_NOT_FOUND;
    }
    return ValidationFailErrorCode.SUCCESS_CODE;
  }

} 