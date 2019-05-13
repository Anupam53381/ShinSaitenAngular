import { TestSetFileColumValidationError } from "./test_set_file_colum_validation_error";

export class TestSetFileRowValidationError {
    rowId: string;
    messageCode: string;
    errorColumList: Array<TestSetFileColumValidationError>;
}