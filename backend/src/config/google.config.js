import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";
import config from "./dotenv.config.js";

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_CREDENTIALS, "base64").toString("utf-8")
);


const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth })


export default sheets