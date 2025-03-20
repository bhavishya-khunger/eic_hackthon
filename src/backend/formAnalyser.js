import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Gemini AI

const GEMINI_API_KEY = "AIzaSyCHeRQiqhlZH7ASGoRAx4wkTDt1Fny1bOk"; // Google Gemini AI Key
const GOOGLE_SEARCH_API_KEY = "AIzaSyA35PkKc_eYizJz0xB4rHC3L--60udV6UE"; // Google Custom Search API Key
const GOOGLE_CX = "72366dd8573174498"; // Custom Search Engine ID

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * 🔍 Extract insights from startup website using Gemini AI
 */
const analyzeWebsite = async (websiteUrl) => {
  if (!websiteUrl) return "";

  try {
    const response = await axios.get(websiteUrl);
    const websiteContent = response.data.substring(0, 2000); // Limit to 2000 chars

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = `Extract key details about this startup from the following content:\n\n"${websiteContent}"`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return result.response.text() || "";
  } catch (error) {
    console.error("🔴 Error analyzing website:", error.message);
    return "";
  }
};

/**
 * 🔍 Generate refined Google Search query for India-based mentors
 */
const generateSmartSearchQuery = async (formData, websiteInsights) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Based on the following startup data:
    - Industry: ${formData.industry}
    - Business Model: ${formData.businessModel}
    - Startup Stage: ${formData.startupStage}
    - Description: ${formData.description || "N/A"}
    - Website Insights: ${websiteInsights || "N/A"}

    Generate a precise Google Search query to find expert startup mentors from LinkedIn **who are based in India** and match this startup's profile. Use keywords like "India", "Indian startup mentor", and ensure the results are from LinkedIn India (site:in.linkedin.com).`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return result.response.text() || "";
  } catch (error) {
    console.error("🔴 Error generating search query:", error.message);
    return "Best startup mentors in India site:in.linkedin.com";
  }
};

/**
 * 🔍 Fetch relevant LinkedIn mentors from India
 */
export const analyzeStartupData = async (formData) => {
  console.log("🔍 Analyzing Startup Data:", formData);

  const websiteInsights = await analyzeWebsite(formData.website || "");
  const smartQuery = await generateSmartSearchQuery(formData, websiteInsights);
  console.log("🚀 Enhanced Search Query (India-only):", smartQuery);

  // 🔹 Google Custom Search with India-specific query
  const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    smartQuery + " site:in.linkedin.com"
  )}&key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_CX}`;

  try {
    const response = await axios.get(searchUrl);
    return response.data.items
      ? response.data.items.map((item) => ({
          name: item.title,
          profileLink: item.link,
          description: item.snippet,
        }))
      : [];
  } catch (error) {
    console.error("🔴 Google Search API Error:", error.message);
    return [];
  }
};
