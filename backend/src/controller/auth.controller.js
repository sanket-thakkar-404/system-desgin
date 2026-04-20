import { signupLogic } from "../services/auth.service.js";


export const signupController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 🔴 Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Password are required",
      });
    }

    // 🔴 Call business logic
    const user = await signupLogic({
      name,
      email,
      password,
      role,
    });

    // 🔴 Success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.error("Signup Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body

  console.log(email, password)

  res.json("Login controller working properly")
}

export const getMeController = async (req, res) => {
  console.log("get controller is working")
}

