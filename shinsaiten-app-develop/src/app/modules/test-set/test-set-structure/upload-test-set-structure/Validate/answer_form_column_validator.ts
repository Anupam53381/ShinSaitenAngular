import { AbstractColumnValidator } from "./abstract_column_validator";
import { CommonConstant } from "../../../../../shared/common-constant";
import { ReturnStatement } from "@angular/compiler";

export class AnswerFormColumnValidator extends AbstractColumnValidator {
    public ANSWER_FORM_ARRAY = CommonConstant.ANSWER_FORM_VALUE_ARRAY;

    validateColumn(value: string): string {

        if (value.trim() === '') {
            return CommonConstant.VALIDATION_SUCCESS_CODE;
        }
        /* Value Range validation*/
        if (this.ANSWER_FORM_ARRAY.indexOf(value.trim()) === -1) {
            return CommonConstant.ANSWER_FORM_VALUE_OUT_OF_RANGE;
        }
        return CommonConstant.VALIDATION_SUCCESS_CODE;

    }


}