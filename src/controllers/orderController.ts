import { Request, Response } from "express";
import { CartService, OrderDetailService, OrderService } from "../services";

class OrderController {
  async handleCreateOrder(req: Request, res: Response) {
    const { MSKH, DonHang, DiaChi, SoDienThoai, HoTenKH, isBuyNow } = req.body;
    try {
      const SoDonDH: string[] = [];

      for (const item of DonHang) {
        const createOrderDetail = await OrderDetailService.createOrderDetail(
          item
        );
        if (createOrderDetail.statusCode !== 0) {
          return res.status(401).json(createOrderDetail);
        }
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
        if (!isBuyNow) {
          for (const item of DonHang) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const createOrderDetail = await CartService.removeFromCart(
              item._id
            );
          }
        }
      }

      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      console.log("error", error);
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleCreateOrder", err: err.message });
    }
  }

  async handleGetOrder(req: Request, res: Response) {
    const { MSKH, TrangThai } = req.body;
    try {
      const response = await OrderService.getAllOrderByUserId(MSKH, TrangThai);

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

  async handleGetUserStatistic(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await OrderService.getUserStatistic(id);

      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleGetUserStatistic", err: err.message });
    }
  }

  async handleGetAdminStatistic(req: Request, res: Response) {
    try {
      const response = await OrderService.getAdminStatistic();

      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleGetAdminStatistic", err: err.message });
    }
  }

  async handleGetOrderByAdmin(req: Request, res: Response) {
    const { TrangThai } = req.query;
    try {
      const response = await OrderService.getAllOrderByStatus(
        TrangThai as string
      );

      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleGetOrderByAdmin", err: err.message });
    }
  }

  async handleDeleteOrder(req: Request, res: Response) {
    const { id } = req.params;
    console.log("id", id);
    try {
      const response = await OrderService.deleteOrder(id);

      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleDeletOrder", err: err.message });
    }
  }

  async handleUpdateOrder(req: Request, res: Response) {
    const { id, TrangThai, MSNV } = req.body;
    try {
      const response = await OrderService.updateOrder(id, TrangThai, MSNV);

      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleUpdateOrder", err: err.message });
    }
  }

  async handleConfirmOrder(req: Request, res: Response) {
    const { id, TrangThai, NgayGH, MSNV } = req.body;
    try {
      const response = await OrderService.confirmOrder(
        id,
        TrangThai,
        NgayGH,
        MSNV
      );

      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleConfirmOrder", err: err.message });
    }
  }

  async handleConfirmReceive(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await OrderService.confirmReceive(id);

      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleConfirmReceive", err: err.message });
    }
  }
}

export default new OrderController();
