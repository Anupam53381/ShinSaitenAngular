import { CommonConstant } from "../../../../../shared/common-constant";

export class RowValidator {

    public validateRow(value: any): string {
        if (!value) {
            return CommonConstant.TEST_SET_STRUCTURE_EMPTY_ROW_ERROR_CODE;
        }
        if (value.length !== CommonConstant.TEST_SET_STRUCTURE_COLUMN_SIZE) {
            return CommonConstant.TEST_SET_STRUCTURE_COLUMN_SIZE_INVALD;
        }
        return CommonConstant.VALIDATION_SUCCESS_CODE;
    }








}