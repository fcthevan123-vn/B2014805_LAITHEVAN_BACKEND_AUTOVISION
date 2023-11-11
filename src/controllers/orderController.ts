import { Request, Response } from "express";
import { CartService, OrderDetailService, OrderService } from "../services";

class OrderController {
  async handleCreateOrder(req: Request, res: Response) {
    const { MSKH, DonHang, DiaChi, SoDienThoai, HoTenKH } = req.body;
    try {
      const SoDonDH: string[] = [];
      for (const item of DonHang) {
        const createOrderDetail = await OrderDetailService.createOrderDetail(
          item
        );
        SoDonDH.push(createOrderDetail.data._id);
      }

      const response = await OrderService.createOrder({
        MSKH,
        SoDonDH,
        DiaChi,
        SoDienThoai,
        HoTenKH,
      });

      if (response.statusCode === 0) {
        for (const item of DonHang) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const createOrderDetail = await CartService.removeFromCart(item._id);
        }
      }

      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleCreateOrder", err: err.message });
    }
  }

  async handleGetOrder(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const response = await OrderService.getAllOrderByUserId(id);

      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleCreateOrder", err: err.message });
    }
  }
}

export default new OrderController();
