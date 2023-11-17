import Product from "../models/Product";
import { HangHoaTS, ResTS } from "../utils/allTypeTs";
import imageProductService from "./imageProductService";

class ProductServices {
  async createProduct({
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
    HinhHH,
  }: HangHoaTS) {
    try {
      const productDoc: HangHoaTS = await Product.create({
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
        HinhHH,
      });

      if (!productDoc) {
        return {
          statusCode: 1,
          message: "Tạo sản phẩm thất bại",
        } as ResTS<HangHoaTS>;
      }

      return {
        statusCode: 0,
        message: "Tạo sản phẩm thành công",
        data: productDoc,
      } as ResTS<HangHoaTS>;
    } catch (err) {
      const error = err as Error;
      return {
        statusCode: -1,
        message: error.message,
      };
    }
  }

  async updateProduct(
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
      HinhHH,
    }: HangHoaTS,
    id: string
  ) {
    try {
      const productDoc: HangHoaTS | null = await Product.findByIdAndUpdate(id, {
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
        HinhHH,
      });

      if (!productDoc) {
        return {
          statusCode: 1,
          message: "Cập nhật sản phẩm thất bại",
        } as ResTS<HangHoaTS>;
      }

      return {
        statusCode: 0,
        message: "Cập nhật sản phẩm thành công",
        data: productDoc,
      } as ResTS<HangHoaTS>;
    } catch (err) {
      const error = err as Error;
      return {
        statusCode: -1,
        message: error.message,
      };
    }
  }

  async getAllProducts() {
    try {
      const productDoc = await Product.find().populate({
        path: "HinhHH",
        model: "ImageProduct",
      });

      if (!productDoc) {
        return {
          statusCode: 1,
          message: "Lấy sản phẩm thất bại",
        };
      }
      return {
        statusCode: 0,
        message: "Lấy sản phẩm thanh cong",
        data: productDoc,
      };
    } catch (error) {
      console.log("error", error);
      const err = error as Error;
      return {
        statusCode: -1,
        message: err.message,
      };
    }
  }

  async getProductById(id: string) {
    try {
      const productDoc = await Product.findById(id).populate({
        path: "HinhHH",
        model: "ImageProduct",
      });

      if (!productDoc) {
        return {
          statusCode: 1,
          message: "Lấy sản phẩm thất bại",
        };
      }
      return {
        statusCode: 0,
        message: "Lấy sản phẩm thanh cong",
        data: productDoc,
      };
    } catch (error) {
      const err = error as Error;
      return {
        statusCode: -1,
        message: err.message,
      };
    }
  }
  catch(error: Error) {
    const err = error as Error;
    return {
      statusCode: -1,
      message: err.message,
    };
  }

  async deleteProduct(id: string) {
    try {
      const productDoc = await this.getProductById(id);
      if (productDoc.statusCode !== 0) {
        return productDoc;
      }

      for (const image of productDoc.data.HinhHH) {
        const deleteImage = await imageProductService.deleteImageProduct(
          image._id
        );
        if (deleteImage.statusCode === 0) {
          continue;
        }
      }
      const productDocDelete = await Product.findByIdAndDelete(id);

      return {
        statusCode: 0,
        message: "Xoá sản phẩm thanh cong",
        data: productDocDelete,
      };
    } catch (error) {
      const err = error as Error;
      return {
        statusCode: -1,
        message: err.message,
      };
    }
  }

  async searchProduct(keyWord: string) {
    try {
      let productDoc;
      if (keyWord.length > 0) {
        productDoc = await Product.find({
          TenHH: { $regex: new RegExp(keyWord, "i") },
        }).populate({
          path: "HinhHH",
          model: "ImageProduct",
        });
      } else {
        productDoc = await Product.find().populate({
          path: "HinhHH",
          model: "ImageProduct",
        });
      }

      if (!productDoc) {
        return {
          statusCode: 1,
          message: "Lấy danh sách sản phẩm thất bại",
        };
      }

      return {
        statusCode: 0,
        message: "Lấy danh sách thành công",
        data: productDoc,
      };
    } catch (error) {
      const err = error as Error;
      return {
        statusCode: -1,
        message: err.message,
      };
    }
  }
}

export default new ProductServices();
