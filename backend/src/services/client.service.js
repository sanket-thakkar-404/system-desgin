import { createClient, getClient } from "../constants/clientMap.js";
import { clearClientCache, getClientCache, isClientCacheValid, setClientCache } from "../utils/cache.js";
import { getNextRange } from "../utils/getNextRange.js";
import { appendData, getData, updateData } from "./sheet.service.js";

export const createClientLogic = async (data) => {

  const {
    clientName,
    GSTIN,
    PAN,
    Industry,
    Category,
    ContactPerson,
    Mobile,
    emailId,
    Address,
    stateCode
  } = data


  if (!clientName || !Mobile) {
    throw new Error("Client Name and Mobile are required");
  }

  const range = await getNextRange(createClient)

  const values = [[
    clientName,
    GSTIN || "",
    PAN || "",
    Industry || "",
    Category || "",
    ContactPerson || "",
    Mobile,
    emailId || "",
    Address || "",
    stateCode || ""
  ]];

  await appendData(createClient.sheetId, range, values)

  clearClientCache();

  return values

}


export const getClientLogic = async () => {

  // 🔴 1. cache check
  if (isClientCacheValid() && getClientCache()) {
    // console.log("⚡ Services from cache for client");
    return getClientCache();
  }

  const rows = await getData(getClient.sheetId, getClient.range)

  const clients = rows.map((row) => ({
    id: row[0] || "",
    clientName: row[1] || "",
    GSTIN: row[2] || "",
    PAN: row[3] || "",
    industry: row[4] || "",
    category: row[5] || "",
    contactPerson: row[6] || "",
    mobile: row[7] || "",
    emailId: row[8] || "",
    address: row[9] || "",
  }));

  setClientCache(clients)

  return clients
}


export const updateClientLogic = async (id, data) => {

  const {
    clientName,
    GSTIN,
    PAN,
    Industry,
    Category,
    ContactPerson,
    Mobile,
    emailId,
    Address
  } = data;

  // 🔴 validation
  if (!id) {
    throw new Error("Client ID is required");
  }

  if (!clientName || !Mobile) {
    throw new Error("Client Name and Mobile are required");
  }

  // 🔹 STEP 1: fetch all rows
  const rows = await getData(getClient.sheetId, getClient.range);

  // 🔹 STEP 2: find row index
  const rowIndex = rows.findIndex(row => row[0] == id);

  if (rowIndex === -1) {
    throw new Error("Client not found");
  }

  // 🔹 STEP 3: calculate actual row
  const startRow = getClient.startRow || 5;
  const actualRow = startRow + rowIndex;

  // 🔹 STEP 4: update range (skip ID column A)
  const [sheetName] = getClient.range.split("!");

  const range = `${sheetName}!B${actualRow}:J${actualRow}`;

  const values = [[
    clientName,
    GSTIN || "",
    PAN || "",
    Industry || "",
    Category || "",
    ContactPerson || "",
    Mobile,
    emailId || "",
    Address || ""
  ]];

  // 🔹 STEP 5: update sheet
  await updateData(getClient.sheetId, range, values);


  clearClientCache()

  return {
    id,
    clientName,
    Mobile
  };
};