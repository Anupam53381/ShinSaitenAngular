import { TestSetStructureFileColumValidationError } from "./test_set_structure_file_colum_validation_error";

export class TestSetStructureFileRowValidationError {
    rowId: string;
    messageCode: string;
    errorColumList: Array<TestSetStructureFileColumValidationError>;
}