import { RowValidator } from "./row_validator";
import { CommonConstant } from "../../../../../shared/common-constant";
import { HeaderColumnValidatorImpl } from "./header_column_validator";
import { TestSetStructureFileRowValidationError } from "./test_set_structure_file_row_validation_error";
import { TestSetStructureFileColumValidationError } from "./test_set_structure_file_colum_validation_error";
import { ValidatorBuilder } from "./validator_builder";

export class ValidateTestSetStructureFile {

    //public HeaderName = TestSetFileValidationRules.HEADER_NAMES;
    public TEST_STRUCTURE_HEADER = CommonConstant.TEST_STRUCTURE_HEADER_NAME_LIST;
    errorBeanArray = new Array<TestSetStructureFileRowValidationError>();
    rowValidator = new RowValidator();
    headerCellValidator = new HeaderColumnValidatorImpl();
    constructor() {

    }
    public isFileEmpty(testSetStructureFileData: any) {

        for (let i = 0; i < testSetStructureFileData.length; i++) {
            var roWContain = testSetStructureFileData[i];
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
        return testSetFileData;
    }

    public removeLastEmptyColumnFromHeader() {


    }

    public buildColumnValidationErrorBean(columnName: string, columnValue, messageCode: string): TestSetStructureFileColumValidationError {

        let testSetFileColumnValiError = new TestSetStructureFileColumValidationError();
        testSetFileColumnValiError.columnName = columnName;
        testSetFileColumnValiError.rejectedValue = columnValue;
        testSetFileColumnValiError.messageCode = messageCode;
        return testSetFileColumnValiError;
    }

    public validateTestSetStructureHeader(testSetStructureFileData: any) {


        var rowValidationFail = false;
        var columnValidationFail = false;
        var headeValidationFail = false;

        var headerRow = testSetStructureFileData[0].split(',');
        var validationCode = this.rowValidator.validateRow(headerRow);
        var testSetRowValidation = new TestSetStructureFileRowValidationError();
        var testSetColumnValidationError = new Array<TestSetStructureFileColumValidationError>();
        if (validationCode !== CommonConstant.VALIDATION_SUCCESS_CODE) {
            /*Header row is invalid*/
            rowValidationFail = true;
        }

        if (!rowValidationFail) {
            /*Validate Header Column*/
            for (let column = 0; column < headerRow.length; column++) {

                let headerName = headerRow[column];
                var validationCode = this.headerCellValidator.validateColumn(headerName, column);
                if (validationCode !== CommonConstant.VALIDATION_SUCCESS_CODE) {

                    columnValidationFail = true;
                    let testSetFileColumnValiError = this.buildColumnValidationErrorBean(this.TEST_STRUCTURE_HEADER[column], headerName, validationCode);
                    testSetColumnValidationError.push(testSetFileColumnValiError);

                }

            }
            testSetRowValidation.errorColumList = testSetColumnValidationError;
        }
        if (rowValidationFail || columnValidationFail) {
            headeValidationFail = true;
            testSetRowValidation.rowId = "1";
            testSetRowValidation.messageCode = validationCode;
            this.errorBeanArray.push(testSetRowValidation);

        }
        return headeValidationFail;
    }


    public validateTestSetStructureFileData(testSetStructureFileData: any) {

        console.log("CSV DATA IN VALIDATION METHOD" + testSetStructureFileData);

        var testItemIdArray = new Array<string>();

        console.log("Test Set Data before removing " + testSetStructureFileData);
        /* removing the last row beacause is generate empty some time */
        this.removeLastEmptyRow(testSetStructureFileData);
        console.log("Test Set Data After remove last empty row is " + testSetStructureFileData);
        if (this.isFileEmpty(testSetStructureFileData)) {
            /*File is empty build map*/
            var testSetRowValidation = new TestSetStructureFileRowValidationError();
            testSetRowValidation.rowId = "1";
            testSetRowValidation.messageCode = CommonConstant.EMPTY_FILE_ERROR_CODE;
            this.errorBeanArray.push(testSetRowValidation);
            return this.errorBeanArray;
        }
        var headerValidationFail = this.validateTestSetStructureHeader(testSetStructureFileData);

        if (headerValidationFail) {
            return this.errorBeanArray;
        }

        if (this.isFileBodyEmpty(testSetStructureFileData)) {
            var testSetRowValidation = new TestSetStructureFileRowValidationError();
            testSetRowValidation.rowId = "1";
            testSetRowValidation.messageCode = CommonConstant.EMPTY_FILE_BODY_ERROR_CODE;
            this.errorBeanArray.push(testSetRowValidation);
            return this.errorBeanArray;

        }
        /*Validate the  data */
        for (let i = 1; i < testSetStructureFileData.length; i++) {
            var rowValidationFail = false;
            var columnValidationFail = false;
            var row = testSetStructureFileData[i].split(',');
            let rowValidationCode = this.rowValidator.validateRow(row);
            var testSetRowValidation = new TestSetStructureFileRowValidationError();
            if (rowValidationCode !== CommonConstant.VALIDATION_SUCCESS_CODE) {
                /*Header row is invalid*/
                rowValidationFail = true;
            }

            if (!rowValidationFail) {

                var testSetColumnValidationError = new Array<TestSetStructureFileColumValidationError>();

                for (let column = 0; column < row.length; column++) {
                    /*Validate first cell that is testItemDescription*/
                    let columnValue = row[column];
                    var columnValidator = ValidatorBuilder.getValidator(column);
                    var validationCode = columnValidator.validateColumn(row[column]);
                    if (validationCode === CommonConstant.VALIDATION_SUCCESS_CODE && column == 1) {
                        columnValue = columnValue.trim();
                        /*Checking for duplicate*/
                        if (testItemIdArray.indexOf(columnValue) > -1) {
                            validationCode = CommonConstant.TEST_ITEM_ID_VALUE_DUPLICATE_ERROR_CODE;
                        } else {
                            testItemIdArray.push(columnValue);
                        }
                    }
                    /*All Validation Finish check final status of validation*/
                    if (validationCode !== CommonConstant.VALIDATION_SUCCESS_CODE) {
                        columnValidationFail = true;
                        var validationErrorBean = this.buildColumnValidationErrorBean(this.TEST_STRUCTURE_HEADER[column], columnValue, validationCode);
                        testSetColumnValidationError.push(validationErrorBean);
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