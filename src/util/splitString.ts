/** @format */

export const splitString = (stringInput: string, separator: string): string[] => {
  if (stringInput.trim() === '') {
    return []
  }
  return stringInput.split(separator).map((str) => str.trim())
};  