export class ValidationFailErrorCode {
    /*validation failure messages*/
    public static SUCCESS_CODE = "00";
    /*File level error messages will start 01 to 10*/
    public static EMPTY_FILE_ERROR_CODE = "file_empty";
    public static EMPTY_FILE_BODY_ERROR_CODE = "file_body_empty";

    /*Row lebel error message will */
    public static EMPTY_ROW_ERROR_CODE = "row_empty";
    public static ROW_SIZE_INVALID = "row_colomn_size_invalid"; 
    /*Column level messages rang 21 to 30*/
    public static HEADER_NAME_NOT_FOUND = "header_name_not_found";
    public static HEADER_POSITION_NOT_VALID = "header_position_invalid";
    public static EMPTY_HEADER_CELL_ERROR_CODE = "header_is_empty";

    public static EMPTY_CELL_ERROR_CODE = "column_is_empty";
    public static MAX_LENGTH_ERROR_CODE = "max_length_exceed";
    public static DUPLICATE_VALUE_ERROR_CODE = "duplicate_name";
    public static INVALID_CHARCTER_ERROR_CODE="invalid_characters";


}
