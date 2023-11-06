import { Request, Response } from "express";
import { UserService } from "../services";
import { File } from "buffer";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      files?: File[];
    }
  }
}

class UserController {
  async handleCreateProduct(req: Request, res: Response) {
    const files = req.files;
    console.log("--------------------------");
    console.log("files", files);
    try {
      return res.status(200).json("ok");
    } catch (error) {
      console.log("error", error);
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleCreateProduct ", err: err.message });
    }
  }
}

export default new UserController();
