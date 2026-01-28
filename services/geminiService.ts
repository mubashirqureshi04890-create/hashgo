
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function fetchAppDescription() {
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
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      headline: "Master Your Mining Workflow",
      subheadline: "HASHGO delivers elite-tier mining management for modern hardware. Secure, fast, and remarkably efficient.",
      features: [
        { title: "Hash Optimization", description: "Squeeze every drop of performance from your mobile chipset." },
        { title: "Dynamic Logic", description: "Smart algorithm switching based on network difficulty." },
        { title: "Global Sync", description: "Real-time telemetry across all your HASHGO nodes." }
      ]
    };
  }
}
