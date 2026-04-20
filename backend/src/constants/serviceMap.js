import config from "../config/dotenv.config.js";

export const serviceMap = {
  "Consent to Establish (CTE)": {
    sheetId: config.FMSCTE_SPREADSHEET_ID,
    range: "FMS!B8:E",
    startRow: 6,
    sheetName: "FMS",
    startCol: "B",
    endCol: "E",
  },

  "CTO Renewal": {
    sheetId: config.FMSCTO_SPREADSHEET_ID,
    range: "FMS!B8:E",
    startRow: 6,
    sheetName: "FMS",
    startCol: "B",
    endCol: "E",
  },

  "Debt Syndication & Project Finance": {
    sheetId: config.FMSDEBT_SPREADSHEET_ID,
    range: "FMS!B7:E",
    startRow: 6,
    sheetName: "FMS",
    startCol: "B",
    endCol: "E",
  },

  "CGWA / Groundwater NOC": {
    sheetId: config.FMSCGWA_SPREADSHEET_ID,
    range: "FMS!B7:E",
    startRow: 6,
    sheetName: "FMS",
    startCol: "B",
    endCol: "E",
  },
};

export const createService = {
  sheetId: config.SERVICE_SPREADSHEET_ID,
  range: "All Service_Master!A6:D",
  startRow: 6,
  sheetName: "All Service_Master",
  startCol: "B",
  endCol: "D",
}


export const serviceMasterConfig = {
  sheetId: config.SERVICE_SPREADSHEET_ID,
  range: "All Service_Master!A6:D",
  startRow: 6,
};

