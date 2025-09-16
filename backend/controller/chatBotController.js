import ai from "../config/chatBot.js";

const getResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    res.json({ success: true, text: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
}
export { getResponse };