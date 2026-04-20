
import { createClientLogic, getClientLogic, updateClientLogic } from "../services/client.service.js";




export const createClient = async (req, res) => {
  try {
    const client = await createClientLogic(req.body)

    return res.status(201).json({
      success: true,
      message: "Client created successfully",
      client,
    });

  } catch (err) {
    console.error("createClient error:", err.message);
    return res.status(400).json({
      success: false,
      message: err.message || "Error creating client",
    });
  }
}

export const getClient = async (req, res) => {
  try {
    const clients = await getClientLogic()

    return res.status(201).json({
      success: true,
      message: "Client Fetch successfully",
      clients,
    });

  } catch (err) {
    console.error("gettingClient error:", err.message);
    return res.status(400).json({
      success: false,
      message: err.message || "Error getting client",
    });
  }
}


export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedClient = await updateClientLogic(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Client updated successfully",
      client: updatedClient,
    });

  } catch (err) {
    console.error("updateClient error:", err.message);

    return res.status(400).json({
      success: false,
      message: err.message || "Error updating client",
    });
  }
};



