import { getData } from "../services/sheet.service.js";

export const getNextRange = async ({ sheetId, range, startRow, sheetName, startCol, endCol }) => {
  const data = await getData(sheetId, range);
  const nextRow = data.length + startRow;

  return `${sheetName}!${startCol}${nextRow}:${endCol}${nextRow}`;
};