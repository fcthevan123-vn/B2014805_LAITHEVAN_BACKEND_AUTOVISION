import { Request, Response } from "express";
import imageProductService from "../services/imageProductService";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import * as dotenv from "dotenv";
import { HangHoaTS, HinhHH, ResTS } from "../utils/allTypeTs";
import { ProductService } from "../services";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class UserController {
  async handleCreateProduct(req: Request, res: Response) {
    const {
      TenHH,
      MoTaHH,
      Gia,
      SoLuongHang,
      TrongLuong,
      ChatLieu,
      PhuHopVoi,
      CongNgheDem,
      DeNgoai,
      GhiChu,
      NoiBat,
    } = req.body as HangHoaTS;
    const files = req.files as Express.Multer.File[];
    const uploadedImageData: HinhHH[] = [];
    const uploadedImageIds: string[] = [];

    try {
      if (files.length > 0) {
        for (const file of files) {
          const uploadImage = await imageProductService.uploadImage(file);
          const dataImg = {
            TenHinh: uploadImage.public_id,
            UrlHinh: uploadImage.url,
          };
          uploadedImageData.push(dataImg);
        }
      }

      if (uploadedImageData.length > 0) {
        for (const data of uploadedImageData) {
          const createImg = await imageProductService.createImageProduct(data);
          uploadedImageIds.push(createImg.data);
        }
      }

      const productResponse: ResTS<HangHoaTS> =
        await ProductService.createProduct({
          TenHH,
          MoTaHH,
          Gia,
          SoLuongHang,
          TrongLuong,
          ChatLieu,
          PhuHopVoi,
          CongNgheDem,
          DeNgoai,
          GhiChu,
          NoiBat,
          HinhHH: uploadedImageIds,
        });

      if (productResponse.statusCode !== 0) {
        return res.status(401).json(productResponse);
      }

      return res.status(200).json({
        statusCode: 0,
        message: "Tạo sản phẩm thành công",
      });
    } catch (error) {
      console.log("error", error);
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleCreateProduct ", err: err.message });
    }
  }
  async handleGetAllProducts(req: Request, res: Response) {
    try {
      const response = await ProductService.getAllProducts();
      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleGetAllProducts", err: err.message });
    }
  }

  // async uploadImage(file: Express.Multer.File) {
  //   let isError = false;
  //   let idImg = null;
  //   try {
  //     const stream = cloudinary.uploader.upload_stream(
  //       async (error, result) => {
  //         if (result) {
  //           const dataImage = {
  //             TenHinh: result.public_id,
  //             UrlHinh: result.url,
  //           };
  //           const response = await this.createImageProduct(dataImage);
  //           console.log("loading");
  //           if (response.statusCode === 0) {
  //             console.log("response.data._id", response.data._id);
  //             idImg = response.data._id;
  //           } else {
  //             isError = true;
  //           }
  //         }
  //       }
  //     );

  //     streamifier.createReadStream(file.buffer).pipe(stream);
  //     if (isError) {
  //       return {
  //         statusCode: 1,
  //         message: "Thất bại",
  //         data: "",
  //       };
  //     }

  //     return {
  //       statusCode: 0,
  //       message: "Thanh cong",
  //       data: idImg,
  //     };
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }
}

export default new UserController();
