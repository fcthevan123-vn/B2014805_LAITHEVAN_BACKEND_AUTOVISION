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

  async handleUpdateProduct(req: Request, res: Response) {
    const { id } = req.params;
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
      HinhXoa,
      HinhHH,
      GhiChu,
      NoiBat,
    } = req.body as HangHoaTS;

    const files = req.files as Express.Multer.File[];
    const uploadedImageData: HinhHH[] = [];
    const uploadedImageIds: string[] = [];
    let mergeImage;

    try {
      if (HinhXoa && HinhXoa.length > 0) {
        if (Array.isArray(HinhXoa)) {
          for (const imgId of HinhXoa) {
            const deleteImage = await imageProductService.deleteImageProduct(
              imgId
            );
            if (deleteImage.statusCode === 0) {
              continue;
            }
          }
        } else {
          const deleteImage = await imageProductService.deleteImageProduct(
            HinhXoa
          );
        }
      }

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
          uploadedImageIds.push(createImg.data._id);
        }
      }

      if (HinhHH && HinhHH.length > 0) {
        if (Array.isArray(HinhHH)) {
          mergeImage = [...HinhHH, ...uploadedImageIds];
        } else {
          mergeImage = [HinhHH, ...uploadedImageIds];
        }
      } else {
        mergeImage = uploadedImageIds;
      }

      const productResponse: ResTS<HangHoaTS> =
        await ProductService.updateProduct(
          {
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
            HinhHH: mergeImage,
          },
          id
        );

      if (productResponse.statusCode !== 0) {
        return res.status(401).json(productResponse);
      }

      return res.status(200).json({
        statusCode: 0,
        message: "Cập nhật sản phẩm thành công",
      });
    } catch (error) {
      console.log("error", error);
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleUpdateProduct ", err: err.message });
    }
  }

  async handleDeleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await ProductService.deleteProduct(id);
      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleDeleteProduct", err: err.message });
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

  async handleGetProductsById(req: Request, res: Response) {
    const { id } = req.params;
    console.log("id", id);
    if (!id) {
      return res.status(401).json({
        statusCode: 2,
        message: "Thiếu id",
      });
    }
    try {
      const response = await ProductService.getProductById(id);
      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleGetProductsById", err: err.message });
    }
  }
}

export default new UserController();
