import { Request, Response } from "express";
import { CartService } from "../services";

class CartController {
  async handleAddToCart(req: Request, res: Response) {
    const { MSKH, MSHH, SoLuong, MauSac, Size } = req.body;
    try {
      const response = await CartService.addToCart({
        MSKH,
        MSHH,
        SoLuong,
        MauSac,
        Size,
      });
      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleAddToCart", err: err.message });
    }
  }

  async handleRemoveFromCart(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await CartService.removeFromCart(id);
      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleRemoveFromCart", err: err.message });
    }
  }

  async handleGetCartByUserId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await CartService.getCartByUserId(id);
      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleGetCartByUserId", err: err.message });
    }
  }
}

export default new CartController();
