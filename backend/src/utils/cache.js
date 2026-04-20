// 🔹 CLIENT CACHE
let clientCache = null;
let lastFetchTime = 0;

const CACHE_DURATION = 60 * 2000; // 2 minute

export const getClientCache = () => {
  return clientCache;
};

export const setClientCache = (data) => {
  clientCache = data;
  lastFetchTime = Date.now();
};

export const isClientCacheValid = () => {
  return Date.now() - lastFetchTime < CACHE_DURATION;
};

export const clearClientCache = () => {
  clientCache = null;
};



// 🔹 SERVICES CACHE
let serviceCache = null;
let serviceCacheTime = 0;

export const getServiceCache = () => serviceCache;

export const setServiceCache = (data) => {
  serviceCache = data;
  serviceCacheTime = Date.now();
};

export const isServiceCacheValid = () => {
  return Date.now() - serviceCacheTime < CACHE_DURATION;
};

export const clearServiceCache = () => {
  serviceCache = null;
};