import { ColumnValidation } from "./column_validation";
import { CommonConstant } from "../../../../../shared/common-constant";


export class AbstractColumnValidator implements ColumnValidation {

    validateColumn(columnValue: string): string {

        var regex = new RegExp(CommonConstant.REGEX_FOR_ALFANUMERIC);

        if (columnValue.trim() === '') {
            return CommonConstant.EMPTY_COLUMN_ERROR_CODE;
        }
        if (!(regex.test(columnValue.trim()))) {
            return CommonConstant.INVALID_CHARCTER_ERROR_CODE;
        }

        return CommonConstant.VALIDATION_SUCCESS_CODE;
    }
}