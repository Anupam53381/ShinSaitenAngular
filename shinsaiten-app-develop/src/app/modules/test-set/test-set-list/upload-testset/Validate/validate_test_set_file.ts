import { RowValidator } from "./row_validator";
import { ValidationFailErrorCode } from "./validation_fail_error_code";
import { TestSetNameValidator } from "./test_set_name_validator";
import { HeaderCellValidatorImpl } from "./header_cell_validator";
import { TestSetFileRowValidationError } from "./test_set_file_row_validation_error";
import { TestSetFileColumValidationError } from "./test_set_file_colum_validation_error";
import { TestSetFileValidationRules } from "./test_set_file_validation_rules";

export class ValidateTestSetFile {

    public HeaderName = TestSetFileValidationRules.HEADER_NAMES;
    errorBeanArray = new Array<TestSetFileRowValidationError>();
    testSetNameValidatior = new TestSetNameValidator();
    headerCellValidator = new HeaderCellValidatorImpl();
    constructor() {

    }
    public isFileEmpty(testSetFileData: any) {

        for (let i = 0; i < testSetFileData.length; i++) {
            var roWContain = testSetFileData[i];
            if (roWContain.trim() !== '') {
                return false;
            }
        }
        return true;
    }

    public isFileBodyEmpty(testSetFileData: any) {

        if (testSetFileData.length < 2) {
            /*file does not contains any data*/
            return true;
        }

        return false;

    }

    public removeLastEmptyRow(testSetFileData) {
        var lastIndex = testSetFileData.length - 1;
        var valueAtLastCell = testSetFileData[lastIndex];
        if (valueAtLastCell.trim() === '') {
            testSetFileData.pop(lastIndex);
        }

    }

    public validateTestSetFileData(testSetFileData: any) {
        console.log("CSV DATA IN VALIDATION METHOD" + testSetFileData);
        var testSetNameArray = new Array<string>();
        var rowValidator = new RowValidator();
        console.log("Test Set Data before removing " + testSetFileData);
        /* removing the last row beacause is generate empty some time */
        this.removeLastEmptyRow(testSetFileData);
        console.log("Test Set Data After remove last empty row is " + testSetFileData);
        if (this.isFileEmpty(testSetFileData)) {
            /*File is empty build map*/
            var testSetRowValidation = new TestSetFileRowValidationError();
            testSetRowValidation.rowId = "1";
            testSetRowValidation.messageCode = ValidationFailErrorCode.EMPTY_FILE_ERROR_CODE;
            this.errorBeanArray.push(testSetRowValidation);
            return this.errorBeanArray;
        }


        /*Validate Header Row*/
        for (let i = 0; i < 1; i++) {

            var rowValidationFail = false;
            var columnValidationFail = false;
            var headerRow = testSetFileData[i].split(',');
            var validationCode = rowValidator.validateRow(headerRow);
            var testSetRowValidation = new TestSetFileRowValidationError();
            var testSetColumnValidationError = new Array<TestSetFileColumValidationError>();
            if (validationCode !== ValidationFailErrorCode.SUCCESS_CODE) {
                /*Header row is invalid*/
                rowValidationFail = true;
            }

            if (!rowValidationFail) {
                /*Validate Header Column*/
                for (let column = 0; column < headerRow.length; column++) {
                    var validationCode = this.headerCellValidator.validateCell(headerRow[column], column);
                    if (validationCode !== ValidationFailErrorCode.SUCCESS_CODE) {
                        columnValidationFail = true;
                        let testSetFileColumnValiError = new TestSetFileColumValidationError();
                        testSetFileColumnValiError.columnName = "";
                        testSetFileColumnValiError.messageCode = validationCode;
                        testSetFileColumnValiError.rejectedValue = headerRow[column];
                        testSetColumnValidationError.push(testSetFileColumnValiError);
                    }

                }
                testSetRowValidation.errorColumList = testSetColumnValidationError;
            }
            if (rowValidationFail || columnValidationFail) {
                testSetRowValidation.rowId = "1";
                testSetRowValidation.messageCode = validationCode;
                this.errorBeanArray.push(testSetRowValidation);
                return this.errorBeanArray;
            }
        }
        if (this.isFileBodyEmpty(testSetFileData)) {
            var testSetRowValidation = new TestSetFileRowValidationError();
            testSetRowValidation.rowId = "1";
            testSetRowValidation.messageCode = ValidationFailErrorCode.EMPTY_FILE_BODY_ERROR_CODE;
            this.errorBeanArray.push(testSetRowValidation);
            return this.errorBeanArray;

        }

        for (let i = 1; i < testSetFileData.length; i++) {
            var rowValidationFail = false;
            var columnValidationFail = false;
            var row = testSetFileData[i].split(',');
            let rowValidationCode = rowValidator.validateRow(row);
            var testSetRowValidation = new TestSetFileRowValidationError();
            if (rowValidationCode !== ValidationFailErrorCode.SUCCESS_CODE) {
                /*Header row is invalid*/
                rowValidationFail = true;
            }

            if (!rowValidationFail) {
                var testSetColumnValidationError = new Array<TestSetFileColumValidationError>();
                /*Validate Header Column*/
                for (let column = 0; column < row.length; column++) {

                    if (column === 0) {
                        var columnValue = row[column];
                        var columnValidationCode = this.testSetNameValidatior.validateCell(columnValue);
                        if (columnValidationCode === ValidationFailErrorCode.SUCCESS_CODE) {
                            /*Check For Duplicate Cell Value*/
                            if (testSetNameArray.indexOf(columnValue) > -1) {
                                columnValidationCode = ValidationFailErrorCode.DUPLICATE_VALUE_ERROR_CODE;
                            } else {
                                testSetNameArray.push(columnValue);
                            }

                        }
                        if (columnValidationCode !== ValidationFailErrorCode.SUCCESS_CODE) {
                            columnValidationFail = true;
                            let testSetFileColumnValiError = new TestSetFileColumValidationError();
                            testSetFileColumnValiError.columnName = this.HeaderName[column];
                            testSetFileColumnValiError.messageCode = columnValidationCode;
                            testSetFileColumnValiError.rejectedValue = columnValue;
                            testSetColumnValidationError.push(testSetFileColumnValiError);
                        }
                    }

                }
                testSetRowValidation.errorColumList = testSetColumnValidationError;
            }

            if (rowValidationFail || columnValidationFail) {
                testSetRowValidation.rowId = i.toString();
                testSetRowValidation.messageCode = rowValidationCode;
                this.errorBeanArray.push(testSetRowValidation);
            }

        }

        return this.errorBeanArray;

    }

}