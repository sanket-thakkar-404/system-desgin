import api from "../../api/api";



export const createClients = async (data) => {
  const res = await api.post("/clients/create", data)
  return res.data
}
export const getClients = async () => {
  const res = await api.get("/clients/get-clients")
  return res.data
}
export const getClientById = async (id) => {
  const res = await api.get(`/clients/edit/${id}`)
  return res.data
}
export const editClients = async (id, data) => {
  const res = await api.patch(`/clients/update/${id}`, data)
  return res.data
}

// Service API
export const createService = async (data) => {
  const res = await api.post("/services/create", data)
  return res.data
}

export const getServices = async () => {
  const res = await api.get("/services/get-services")
  return res.data
}

export const assignService = async (data) => {
  const res = await api.post("/services/assign", data)
  return res.data
}
