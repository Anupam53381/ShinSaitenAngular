import { TestItemDescriptionColumnValidator } from "./test_item_description_colum_validator";
import { TestItemIdColumnValidator } from "./test_item_id_column_validator";
import { AnswerFormColumnValidator } from "./answer_form_column_validator";
import { ColumnValidation } from "./column_validation";

export class ValidatorBuilder {
    public static testItemDescriptionColumnValidator: TestItemDescriptionColumnValidator = new TestItemDescriptionColumnValidator();
    public static testItemIdColumnValidator = new TestItemIdColumnValidator();
    public static answerFormColumnValidator = new AnswerFormColumnValidator();

    public static getValidator(columnPosition: any): ColumnValidation {

        if (columnPosition === 0) {
            return this.testItemDescriptionColumnValidator;
        } else if (columnPosition === 1) {
            return this.testItemIdColumnValidator;
        }
        else if (columnPosition === 2) {
            return this.answerFormColumnValidator;
        }

    }



}