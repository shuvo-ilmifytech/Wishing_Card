
import { GoogleGenAI } from "@google/genai";
import { UserInfo } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePersonalizedWish = async (userInfo: UserInfo): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a professional New Year 2026 message for ${userInfo.name} at iLMIFYTECH AGENCY. 
                 The message MUST be exactly: "Wishing you a New Year filled with success, prosperity, and new opportunities. May 2026 be a year of great achievements for all of us. Happy New Year!"
                 Return ONLY this text.`,
      config: {
        temperature: 0.1,
      }
    });

    return response.text?.trim() || "Wishing you a New Year filled with success, prosperity, and new opportunities. May 2026 be a year of great achievements for all of us. Happy New Year!";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "Wishing you a New Year filled with success, prosperity, and new opportunities. May 2026 be a year of great achievements for all of us. Happy New Year!";
  }
};
