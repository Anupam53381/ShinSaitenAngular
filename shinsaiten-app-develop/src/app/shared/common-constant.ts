export class CommonConstant {

    public static RATER_ROLE = 'RATER';
    public static RATER_ADMIN_ROLE = 'RATER_ADMIN';
    public static answerFormFormatDescriptionMap: Map<string, string> = new Map<string, string>( [["1", "String"], ["2", "String Array"],
    ["3", "1 Byte Character"], ["4", "1 Byte Charcter & array"], ["5", "Audio"]] );
    /*Validation related constant*/
    public static TEST_STRUCTURE_HEADER_NAME_LIST = ["Test Item Description", "Test Item Id", "Answer Form"];

    public static ANSWER_FORM_VALUE_ARRAY = ["1", "2", "3", "4", "5"];
    /*Test Structure File Column Max Length */
    public static ANSWER_FORM_COLUMN_MAX_LENGTH = 20;

    public static TEST_ITEM_DESCRIPTION_MAX_LENGTH = 50;

    public static TEST_ITEM_ID_MAX_LENGTH = 20;

    public static TEST_SET_STRUCTURE_COLUMN_SIZE = 3;

    public static REGEX_FOR_ALFANUMERIC = '^[a-zA-Z0-9 /._-]+$';

    public static REGEX_FOR_REMOVE_ALL_SPACE = /\s/g;

    public static VALIDATION_SUCCESS_CODE = "00";

    /*File level error messages will start 01 to 10*/
    public static EMPTY_FILE_ERROR_CODE = "file_empty";
    public static EMPTY_FILE_BODY_ERROR_CODE = "file_body_empty";

    /*Row lebel error message will */
    public static EMPTY_ROW_ERROR_CODE = "row_empty";
    public static ROW_SIZE_INVALID = "row_colomn_size_invalid";
    /*Column level messages */
    public static HEADER_NAME_NOT_FOUND = "header_name_not_found";
    public static HEADER_POSITION_NOT_VALID = "header_position_invalid";
    public static EMPTY_HEADER_COLUMN_ERROR_CODE = "header_is_empty";

    public static EMPTY_COLUMN_ERROR_CODE = "column_is_empty";
    public static MAX_LENGTH_ERROR_CODE = "max_length_exceed";
    public static DUPLICATE_VALUE_ERROR_CODE = "duplicate_name";
    public static INVALID_CHARCTER_ERROR_CODE = "invalid_characters";

    /*Test set structure error message code*/
    public static TEST_SET_STRUCTURE_EMPTY_ROW_ERROR_CODE = "test_set_struc_file_row_is_empty";

    public static TEST_SET_STRUCTURE_COLUMN_SIZE_INVALD = "test_set_struc_file_column_size_invalid";

    public static ANSWER_FORM_VALUE_EMPTY_ERROR_CODE = "answer_form_value_is_empty";

    public static ANSWER_FORM_VALUE_OUT_OF_RANGE = "answer_form_value_out_of_range";

    public static TEST_ITEM_DESCRIPTION_VALUE_EMPTY_ERROR_CODE = "test_item_desc_value_is_empty";

    public static TEST_ITEM_DESCRIPTION_VALUE_MAX_LENGTH_ERROR_CODE = "test_item_desc_max_lenth_exceeded";

    public static TEST_ITEM_DESCRIPTION_VALUE_INVALID_CHARCTER_ERROR_CODE = "test_item_desc_value_invalid_charcter";

    public static TEST_ITEM_ID_VALUE_EMPTY_ERROR_CODE = "test_item_id_value_is_empty";

    public static TEST_ITEM_ID_VALUE_MAX_LENGTH_ERROR_CODE = "test_item_id_max_length_exceeded";

    public static TEST_ITEM_ID_VALUE_DUPLICATE_ERROR_CODE = "test_item_id_value_is_duplicate";

    public static TEST_ITEM_ID_VALUE_INVALID_CHARCTER_ERROR_CODE = "test_item_id_invalid_charcter_found";

    public static TEST_ITEM_DESCRIPTION_HEADER_NOT_FOUND = "test_item_desc_header_not_found";

    public static TEST_ITEM_ID_HEADER_NOT_FOUND = "test_item_id_header_not_found";

    public static ANSWER_FROM_HEADER_NOT_FOUND = "ans_form_header_not_found";

    public static VALIDATION_FAIL_CODE = 200;
    
    public  static  DEFAULT_PAGINATION_SIZE= 5;

    public static PAGINATION_DROP_DOWN: number[] = [5, 10, 20];

    public static STATUS_INCOMPLETE = 0;

    public static STATUS_PARTIAL_COMPLETE = 1;

    public static STATUS_COMPLETE = 2;

    public static SHINSAITEN_ICONS_FILE_PATH = 'http://shinsaiten-dev-file-elb-748022728.ap-northeast-1.elb.amazonaws.com/shinsaiten_resources/shinsaiten_icons';






}