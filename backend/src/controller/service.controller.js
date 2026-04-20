import { assignServiceLogic, createServiceLogic, getServiceLogic } from "../services/service.service.js";

export const createService = async (req, res) => {
  try {
    const result = await createServiceLogic(req.body)

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: result,
    });


  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
    console.error("create Service error:", err.message);
  }
}

export const getServices = async (req, res) => {
  try {
    const services = await getServiceLogic()

    return res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      services,
    });

  } catch (err) {
    console.error("getServices error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Error fetching services",
    });
  }
}

export const assignClientService = async (req, res) => {
  // console.log(req.body)
  try {
    await assignServiceLogic(req.body)
    res.status(201).json({
      success: true,
      message: "Services assigned successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error assigning services",
    });
    console.error("assign Client Service error:", err.message);
  }
}
