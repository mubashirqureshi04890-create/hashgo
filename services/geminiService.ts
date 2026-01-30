
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Safely retrieves the API Key without crashing the browser execution context.
 */
const getSafeApiKey = (): string | undefined => {
  try {
    // Check various common injection points for the environment variable
    return (globalThis as any).process?.env?.API_KEY || 
           (window as any).process?.env?.API_KEY || 
           undefined;
  } catch {
    return undefined;
  }
};

export async function fetchAppDescription() {
  const fallbackData = {
    headline: "PREMIUM MINING ENGINE",
    subheadline: "The industry's most efficient mobile mining utility. High-performance analysis and secure node connectivity.",
    features: [
      { title: "Peak Hashrate", description: "Optimized algorithms for maximum hardware efficiency." },
      { title: "Secure Node", description: "Encrypted communication for safe data transmission." },
      { title: "Smart Metrics", description: "Real-time performance tracking and analytics." }
    ]
  };

  const apiKey = getSafeApiKey();

  // If no API key, return fallbacks immediately to prevent blank screens
  if (!apiKey) {
    console.warn("API Key not found, using local content.");
    return fallbackData;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = "Generate a futuristic description for HASHGO mining software. Keep it professional and tech-focused. Return JSON.";

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

    return response.text ? JSON.parse(response.text) : fallbackData;
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return fallbackData;
  }
}
