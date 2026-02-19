
import { GoogleGenAI, Type } from "@google/genai";
import { HookStyle } from "../types";

export const improveHook = async (originalHook: string, style: HookStyle): Promise<string[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const stylePrompts = {
    [HookStyle.Viral]: "Optimized for maximum shares, reach, and engagement. Uses high-energy words and broad appeal.",
    [HookStyle.Emotional]: "Tugs at feelings, creates deep human connection, and uses evocative storytelling language.",
    [HookStyle.Curiosity]: "Creates an intense information gap, demands a click to resolve, and uses 'the loop' technique.",
    [HookStyle.Authority]: "Positioned as an expert insight, uses data or authoritative framing, and builds instant credibility.",
    [HookStyle.ShortForm]: "Optimized for TikTok/Shorts/Reels. Must be punchy and under 10 words total."
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are a viral content expert. Improve the following hook to be more ${style.toLowerCase()}.

Style Description: ${stylePrompts[style]}

Original hook: "${originalHook}"

Generate 4 improved versions of this hook. Each version must be distinct, high-impact, and strictly follow the ${style} style guidelines.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hooks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of 4 improved hook variations."
          }
        },
        required: ["hooks"]
      }
    }
  });

  const jsonStr = response.text.trim();
  try {
    const data = JSON.parse(jsonStr);
    return data.hooks || [];
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Failed to process the improved hooks.");
  }
};
