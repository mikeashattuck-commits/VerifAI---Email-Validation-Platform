import { GoogleGenAI, Type } from "@google/genai";
import { VerificationResult } from "../types";

const GEMINI_MODEL = "gemini-3-flash-preview";

export async function analyzeEmailWithGemini(
  email: string, 
  currentResult: Partial<VerificationResult>
): Promise<Partial<VerificationResult>> {
  
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key missing");
    return { aiAnalysis: "AI analysis unavailable (Missing API Key)." };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Analyze the email address "${email}".
    Context provided by local validator:
    - Format Valid: ${currentResult.formatValid}
    - MX Records Found: ${currentResult.mxFound}
    - Disposable Detected: ${currentResult.disposable}
    
    Your task:
    1. Verify if this looks like a legitimate corporate or personal email.
    2. Check for subtle typos in the domain that basic regex might miss (e.g. gmai.com instead of gmail.com).
    3. Assess the reputation risk (low, medium, high).
    4. Provide a very short, one-sentence explanation of your finding.

    Return JSON matching this schema:
    {
      "is_likely_valid": boolean,
      "risk_score": number (0-100, where 0 is safe, 100 is high risk),
      "analysis_summary": string,
      "correction_suggestion": string (or null if none)
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            is_likely_valid: { type: Type.BOOLEAN },
            risk_score: { type: Type.NUMBER },
            analysis_summary: { type: Type.STRING },
            correction_suggestion: { type: Type.STRING, nullable: true }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return {};

    const data = JSON.parse(text);

    return {
      aiAnalysis: data.analysis_summary,
      score: Math.max(0, 100 - (data.risk_score || 0)),
      didYouMean: data.correction_suggestion || currentResult.didYouMean,
    };

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return { aiAnalysis: "AI analysis could not complete." };
  }
}