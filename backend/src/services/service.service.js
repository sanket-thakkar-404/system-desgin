import config from "../config/dotenv.config.js";
import { createService, serviceMasterConfig } from "../constants/serviceMap.js";
import { appendData, getData } from "./sheet.service.js";
import { serviceMap } from "../constants/serviceMap.js";
import { getNextRange } from "../utils/getNextRange.js";
import { getServiceCache, isServiceCacheValid, setServiceCache } from "../utils/cache.js";

export const createServiceLogic = async ({ serviceName, leadAuthority, teamLead }) => {

  if (!serviceName || !leadAuthority) {
    throw new Error("Service Name and Lead Authority are required");
  }

  const range = await getNextRange(createService)

  const value = [[serviceName, leadAuthority, teamLead]]

  await appendData(createService.sheetId, range, value)

  clearServiceCache();

  return { serviceName, leadAuthority, teamLead };
}

export const getServiceLogic = async () => {

  // 🔴 1. check cache
  if (isServiceCacheValid() && getServiceCache()) {
    // console.log("⚡ Serving from cache for services");
    return getServiceCache();
  }

  const rows = await getData(serviceMasterConfig.sheetId, serviceMasterConfig.range)

  const services = rows.map((row) => ({
    id: row[0] || "",
    serviceName: row[1] || "",
    leadAuthority: row[2] || "",
    teamLead: row[3] || ""
  }))

  // 🔴 3. store in cache
  setServiceCache(services);

  return services

}

export const assignServiceLogic = async ({ clientId, clientName, services, assignedTo }) => {

  const date = new Date().toLocaleString("en-GB", {
  timeZone: "Asia/Kolkata",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});

  const tasks = services.map(async (service) => {

    const configData = serviceMap[service.serviceName];

    if (!configData) return null

    const range = await getNextRange(configData)

    const value = ["", date, clientId, clientName, "Done"]

    return appendData(configData.sheetId, range, [value])
  })
  await Promise.all(tasks)
}
