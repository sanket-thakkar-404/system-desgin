import config from "../config/dotenv.config.js";
import sheets from "../config/google.config.js";

// =======================================================
// 🔹 1. GET DATA (common function)
// =======================================================

export const getData = async (spreadsheetId, range) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data.values || [];

  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

// =======================================================
// 🔹 2. APPEND DATA (generic function)
// =======================================================

export const appendData = async (spreadsheetId, range, values) => {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

  } catch (error) {
    console.error("Error appending data:", error.message);
    throw error;
  }
};

export const updateData = async (spreadsheetId, range, values) => {
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

  } catch (error) {
    console.error("Error updating data:", error.message);
    throw error;
  }
};