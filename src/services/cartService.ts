import { Cart } from "../models";
import Product from "../models/Product";
import { CartTS } from "../utils/allTypeTs";

class CartServices {
  async addToCart({ MSKH, MSHH, SoLuong, MauSac, Size }: CartTS) {
    try {
      const existedCart = await Cart.find({
        MSHH: MSHH,
        MSKH: MSKH,
        MauSac: MauSac,
        Size: Size,
      });

      const productDoc = await Product.findById(MSHH);

      if (parseInt(productDoc.SoLuongHang) < parseInt(SoLuong)) {
        return {
          statusCode: 3,
          message:
            "Sản phẩm bạn chọn không đủ số lượng, vui lòng tải lại trang",
        };
      }

      if (existedCart.length > 0) {
        return {
          statusCode: 2,
          message: "Sản phẩm đã tồn tại trong giỏ hàng",
          data: existedCart,
        };
      }

      const cartDoc = await Cart.create({
        MSKH,
        MSHH,
        SoLuong,
        MauSac,
        Size,
      });

      if (!cartDoc) {
        return {
          statusCode: 1,
          message: "Thêm vào giỏ hàng thất bại",
        };
      }
      return {
        statusCode: 0,
        message: "Thêm vào giỏ hàng thành công",
        data: cartDoc,
      };
    } catch (error) {
      const err = error as Error;
      return {
        statusCode: -1,
        message: err.message,
      };
    }
  }

  async removeFromCart(cartId: string) {
    try {
      const cartDoc = await Cart.findByIdAndDelete(cartId);
      if (!cartDoc) {
        return {
          statusCode: 1,
          message: "Xoá khỏi giỏ hàng thất bại",
        };
      }
      return {
        statusCode: 0,
        message: "Xoá khỏi giỏ hàng thành công",
        data: cartDoc,
      };
    } catch (error) {
      const err = error as Error;
      return {
        statusCode: -1,
        message: err.message,
      };
    }
  }

  async getCartByUserId(userId: string) {
    try {
      const cartDoc = await Cart.find({
        MSKH: userId,
      }).populate({
        path: "MSHH",
        populate: {
          path: "HinhHH",
        },
      });
      if (!cartDoc) {
        return {
          statusCode: 1,
          message: "Lấy giỏ hàng thất bại",
        };
      }
      return {
        statusCode: 0,
        message: "Lấy giỏ hàng thành công",
        data: cartDoc,
      };
    } catch (error) {
      const err = error as Error;
      return {
        statusCode: -1,
        message: err.message,
      };
    }
  }

  async updateQuantityCart(cartId: string, MSHH: string, SoLuong: string) {
    try {
      const productDoc = await Product.findById(MSHH);
      if (!productDoc) {
        return {
          statusCode: 2,
          message: "Sản phẩm này không tồn tại",
        };
      }

      if (productDoc.SoLuong < SoLuong) {
        return {
          statusCode: 3,
          message: `Sản phẩm này chỉ có ${productDoc.SoLuong}, bạn đã chọn là ${SoLuong}`,
        };
      }

      const cartDoc = await Cart.findByIdAndUpdate(cartId, {
        SoLuong: SoLuong,
      });

      if (!cartDoc) {
        return {
          statusCode: 1,
          message: "Cập nhật giỏ hàng thất bại",
        };
      }

      return {
        statusCode: 0,
        message: "Cập nhật giỏ hàng thành công",
        data: cartDoc,
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
export default new CartServices();
