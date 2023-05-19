/** @format */

import dayjs from "dayjs"

// dayjs.unix = dayjs(timestamp * 1000)

export const formatTimeStampToTime = (timestamp: number, options: string): string => {
  // HH:mm:ss
  const convertedDate = dayjs.unix(timestamp)
  return convertedDate.format(options)
}

export const formatTimeStampToDate = (timestamp: number, options: string): string => {
  // 'DD-MM-YYYY'
  const convertedDate = dayjs.unix(timestamp);
  return convertedDate.format(options)
}	