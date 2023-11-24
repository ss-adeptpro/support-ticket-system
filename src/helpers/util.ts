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

/**
 * Get item details from localStorage
 * @param key string to be checked
 * @returns string || null
 */

export const getItemFromStorage = (key: string) => {
  if (!localStorage) return;

  try {
    //To fix error: `Argument of type 'string | null' is not assignable to parameter of type 'string'`
    // use || '{}' bcoz JSON.parse() requires a string
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch (err) {
    console.error(`Error getting item ${key} from localStorage`, err);
  }
};