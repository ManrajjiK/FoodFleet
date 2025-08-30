import express from "express";
const DisplayDataRouter = express.Router();

// ================= GET ALL DATA =================
DisplayDataRouter.post("/getdata", async (req, res) => {
  try {
    const foodData = global.food_items || [];
    const foodCategory = global.foodCategory || [];

    res.status(200).json({
      success: true,
      foodData,
      foodCategory,
    });
  } catch (error) {
    console.error("Error in /getdata route:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default DisplayDataRouter;
