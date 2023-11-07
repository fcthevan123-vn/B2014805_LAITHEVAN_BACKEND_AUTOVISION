import ImageProduct from "../models/ImageProduct";
import Product from "../models/Product";
import { HangHoaTS, ResTS } from "../utils/allTypeTs";

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

  async getAllProducts() {
    try {
      //   const productDoc = await Product.find().populate("ImageProduct");
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
      const err = error as Error;
      return {
        statusCode: -1,
        message: err.message,
      };
    }
  }
}

export default new ProductServices();
