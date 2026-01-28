
import { GoogleGenAI, Type } from "@google/genai";

// Safe environment variable access for browser/production environments
const getApiKey = () => {
  try {
    return typeof process !== 'undefined' ? process.env.API_KEY : '';
  } catch {
    return '';
  }
};

const apiKey = getApiKey();
// Only initialize if API key is present to avoid crashing the module
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function fetchAppDescription() {
  const fallbackData = {
    headline: "ELITE MINING ENGINE",
    subheadline: "The industry's most powerful mobile mining engine. Optimized for efficiency, engineered for the future.",
    features: [
      { title: "Peak Hashrate", description: "Proprietary algorithms that maximize hardware throughput with minimal heat." },
      { title: "Safe Node", description: "End-to-end encrypted node communication using secure protocols." },
      { title: "Smart Data", description: "Real-time performance tracking and analytics for consistent results." }
    ]
  };

  if (!ai) {
    console.warn("Gemini API key not found. Using fallback content.");
    return fallbackData;
  }

  const prompt = "Generate a futuristic, high-tech description for a professional mining software called 'HASHGO'. Include 3 key features like 'Hash-rate Optimization', 'Dynamic Pool Switching', and 'Protocol Analytics'. Return as JSON.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            subheadline: { type: Type.STRING },
            features: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            }
          },
          required: ["headline", "subheadline", "features"]
        }
      }
    });

    const text = response.text;
    return text ? JSON.parse(text) : fallbackData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return fallbackData;
  }
}
