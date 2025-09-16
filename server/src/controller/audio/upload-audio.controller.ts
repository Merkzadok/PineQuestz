import { Request, Response } from "express";
import { Readable } from "stream";
import cloudinary from "../../config/cloudinary";

export const uploadAudio = async (req: Request, res: Response) => {
  try {
    const bufferStream = new Readable();
    bufferStream.push(req.file?.buffer);
    bufferStream.push(null);

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "voice-recordings" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      bufferStream.pipe(stream);
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};
