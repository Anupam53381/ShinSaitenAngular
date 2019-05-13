import { CommonConstant } from "../../../../../shared/common-constant";


export interface HeaderColumnValidator {

  validateColumn(value: any, cellPosition: any): string;


}

export class HeaderColumnValidatorImpl implements HeaderColumnValidator {

  public TEST_STRUCTURE_HEADERS = CommonConstant.TEST_STRUCTURE_HEADER_NAME_LIST;


  validateColumn(value: any, cellPosition: any): string {

    value = value.trim();

    if (value === '') {
      return CommonConstant.EMPTY_HEADER_COLUMN_ERROR_CODE;
    }
    /**/
    value = value.replace(CommonConstant.REGEX_FOR_REMOVE_ALL_SPACE, "");

    var headerName = this.TEST_STRUCTURE_HEADERS[cellPosition];

    headerName = headerName.replace(CommonConstant.REGEX_FOR_REMOVE_ALL_SPACE, "");

    if (headerName !== value) {
      var validationErrorCode;
      if (cellPosition === 0) {
        validationErrorCode = CommonConstant.TEST_ITEM_DESCRIPTION_HEADER_NOT_FOUND;
      } else if (cellPosition === 1) {
        validationErrorCode = CommonConstant.TEST_ITEM_ID_HEADER_NOT_FOUND;
      }
      else if (cellPosition == 2) {
        validationErrorCode = CommonConstant.ANSWER_FROM_HEADER_NOT_FOUND;
      }
      return validationErrorCode;
    }

    return CommonConstant.VALIDATION_SUCCESS_CODE;
  }

} 