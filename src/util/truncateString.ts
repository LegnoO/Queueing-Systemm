/** @format */

export const truncateString = (stringInput: string, length: number, end = "..."): string | null => {

  return stringInput?.length < length ? stringInput : stringInput.substring(0, length) + end;
};