import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

export async function performOcr(base64Image: string) {
  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Extrais les informations suivantes de cette carte grise française (Certificat d'Immatriculation) au format JSON :
  - immatriculation (A)
  - marque (D.1)
  - modele (D.2 / D.3)
  - annee (B - date de 1ère immatriculation)
  - vin (E)
  - typeCarburant (P.3)
  - couleur
  - puissanceFiscale (P.6)
  
  Réponds uniquement avec le JSON.`,
          },
          {
            inlineData: {
              data: base64Image,
              mimeType: "image/jpeg",
            },
          },
        ],
      },
    ],
  });

  const response = await result.response;
  const text = response.text();
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return {};
  } catch (error) {
    console.error("OCR Parse Error:", error);
    return {};
  }
}
