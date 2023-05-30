import dayjs from "dayjs"

import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";

export const exportToExcel = (excelData: any, fileName: string) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheet.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
};

// dayjs.unix = dayjs(timestamp * 1000)


// format time stamp -> time
export const formatTimeStampToTime = (timestamp: number, options: string): string => {
    // HH:mm:ss
    const convertedDate = dayjs.unix(timestamp)
    return convertedDate.format(options)
}

// format time stamp -> date
export const formatTimeStampToDate = (timestamp: number, options: string): string => {
    // 'DD-MM-YYYY'
    const convertedDate = dayjs.unix(timestamp);
    return convertedDate.format(options)
}

// export const formatTimeStampToDateTime = (timestamp: number, options: string): string => {
//     // 'DD-MM-YYYY'
//     const convertedDate = dayjs.unix(timestamp);
//     return convertedDate.format(options)
// }

// tách mảng chuỗi
export const splitString = (stringInput: string, separator: string): string[] => {
    if (stringInput.trim() === '') {
        return []
    }
    return stringInput.split(separator).map((str) => str.trim())
};


// rút gọn chuỗi
export const truncateString = (stringInput: string, length: number, end = "..."): string | null => {
    return stringInput?.length < length ? stringInput : stringInput.substring(0, length) + end;
};


// pixel sang rem
export function convertPxToRem(px: number): void {
    const baseFontSize = 16
    const rem = px / baseFontSize;
    console.log(`${rem}rem`)
    // return `${rem}rem`;
}