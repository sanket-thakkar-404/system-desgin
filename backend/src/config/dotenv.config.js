import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "GOOGLE_CREDENTIALS",
  "CLIENT_SPREADSHEET_ID",
  "FMSCTE_SPREADSHEET_ID",
  "FMSCTO_SPREADSHEET_ID",
  "FMSDEBT_SPREADSHEET_ID",
  "FMSCGWA_SPREADSHEET_ID",
  "SERVICE_SPREADSHEET_ID",
  "PORT",
  "FRONTEND_URL"
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`${key} is missing in environment variables`);
  }
});
const config = {
  GOOGLE_CREDENTIALS: process.env.GOOGLE_CREDENTIALS,
  CLIENT_SPREADSHEET_ID: process.env.CLIENT_SPREADSHEET_ID,
  FMSCTE_SPREADSHEET_ID: process.env.FMSCTE_SPREADSHEET_ID,
  FMSCTO_SPREADSHEET_ID: process.env.FMSCTO_SPREADSHEET_ID,
  FMSDEBT_SPREADSHEET_ID: process.env.FMSDEBT_SPREADSHEET_ID,
  FMSCGWA_SPREADSHEET_ID: process.env.FMSCGWA_SPREADSHEET_ID,
  SERVICE_SPREADSHEET_ID: process.env.SERVICE_SPREADSHEET_ID,
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

export default config;