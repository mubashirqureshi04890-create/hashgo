
import { GoogleGenAI, Type } from "@google/genai";

export async function fetchAppDescription() {
  const fallbackData = {
    headline: "PREMIUM MINING ENGINE",
    subheadline: "The industry's most efficient mobile mining utility. High-performance data analysis and secure node connectivity.",
    features: [
      { title: "Peak Hashrate", description: "Optimized algorithms for maximum hardware efficiency." },
      { title: "Secure Node", description: "Encrypted communication for safe data transmission." },
      { title: "Smart Metrics", description: "Real-time performance tracking and detailed analytics." }
    ]
  };

  try {
    // Safe access to API Key to prevent "black screen" crashes in production
    const apiKey = (globalThis as any).process?.env?.API_KEY;
    
    if (!apiKey) {
      return fallbackData;
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = "Generate a futuristic description for 'HASHGO' mining software. JSON format.";

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
    console.error("Service Error:", error);
    return fallbackData;
  }
}
