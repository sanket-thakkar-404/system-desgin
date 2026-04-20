import config from "../config/dotenv.config.js";

export const createClient = {
  sheetId: config.CLIENT_SPREADSHEET_ID,
  range: "🗃️ MASTER DATA!A5:J",
  startRow: 5,
  sheetName: "🗃️ MASTER DATA",
  startCol: "B",
  endCol: "K",
};


export const getClient = {
  sheetId: config.CLIENT_SPREADSHEET_ID,
  range: "🗃️ MASTER DATA!A5:J",
  startRow: 5,
}