import { Cart } from "../models";
import { CartTS } from "../utils/allTypeTs";

class CartServices {
  async addToCart({ MSKH, MSHH, SoLuong, MauSac, Size }: CartTS) {
    try {
      const existedCart = await Cart.find({
        MSHH: MSHH,
        MSKH: MSKH,
      });

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
}
export default new CartServices();
