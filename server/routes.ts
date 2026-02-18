import type { Express } from "express";
import { createServer, type Server } from "node:http";
import multer from "multer";
import { performOcr } from "./ocr";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/ocr/scan", upload.single("media"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const base64Image = req.file.buffer.toString("base64");
      const result = await performOcr(base64Image);
      
      res.json(result);
    } catch (error: any) {
      console.error("OCR Route Error:", error);
      res.status(500).json({ error: error.message || "OCR processing failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
