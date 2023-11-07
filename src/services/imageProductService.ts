import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import * as dotenv from "dotenv";
import { HinhHH } from "../utils/allTypeTs";
import ImageProduct from "../models/ImageProduct";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class ImageProductService {
  async uploadImage(file: Express.Multer.File) {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  }

  async createImageProduct(dataImage: HinhHH) {
    try {
      const imageDoc = await ImageProduct.create(dataImage);
      if (!imageDoc) {
        return {
          statusCode: 1,
          message: "Tải hình lên thất bại",
        };
      }
      return {
        statusCode: 0,
        message: "Tải hình lên thành công",
        data: imageDoc,
      };
    } catch (error) {
      const err = error as Error;
      return {
        statusCode: 1,
        message: err.message,
      };
    }
  }
}

export default new ImageProductService();
