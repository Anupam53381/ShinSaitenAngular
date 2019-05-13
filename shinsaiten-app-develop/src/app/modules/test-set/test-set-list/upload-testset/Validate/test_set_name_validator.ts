import { CellValidation } from "./cell_validation";
import { ValidationFailErrorCode } from "./validation_fail_error_code";

import * as data from './error.json';
import { TestSetFileValidationRules } from "./test_set_file_validation_rules";
import { AbstractCellValidator } from "./abstract_cell_validator";

export class TestSetNameValidator extends AbstractCellValidator {
 

  validateCell(value: string): string {
    return super.validateCell(value);
  }

}