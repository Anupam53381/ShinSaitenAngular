import { AbstractColumnValidator } from "./abstract_column_validator";
import { CommonConstant } from "../../../../../shared/common-constant";

export class TestItemIdColumnValidator extends AbstractColumnValidator {


    validateColumn(value: string): string {
        var regex = new RegExp(CommonConstant.REGEX_FOR_ALFANUMERIC);
        if (value.trim() === '') {
            return CommonConstant.TEST_ITEM_ID_VALUE_EMPTY_ERROR_CODE;
        }
        if (!(regex.test(value.trim()))) {
            return CommonConstant.TEST_ITEM_ID_VALUE_INVALID_CHARCTER_ERROR_CODE;
        }
        if (value.trim().length > CommonConstant.TEST_ITEM_ID_MAX_LENGTH) {
            return CommonConstant.TEST_ITEM_ID_VALUE_MAX_LENGTH_ERROR_CODE;
        }

        return CommonConstant.VALIDATION_SUCCESS_CODE;
    }


}