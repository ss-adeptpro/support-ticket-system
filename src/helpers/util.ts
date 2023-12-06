import {isEmpty as isInputEmpty} from "lodash";

/**
 * Check if input is empty - Not allowed - NULL, NAN, blank, "", undefined
 * @param inputStr string to be checked
 * @returns boolean
 */
export const isEmptyString = (inputStr:string) => {  
  return isInputEmpty(inputStr) || 
  (typeof inputStr === "string" && inputStr.trim().length === 0) ||
  (typeof inputStr !== "string")
};