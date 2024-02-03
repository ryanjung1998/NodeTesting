import { Request, Response, NextFunction, response } from "express";
import ScannerService from "../services/scanner.service";

class ScannerController {
  constructor(private service: ScannerService) {
    this.service = service;
  }
  postMaterials = async (//must send image as tag "image" and value base64 string
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> => {
    try {
      let materials = await (async () => {
        var str;
        str = this.service.getMaterials(await this.service.getTextFromImage(req.body.image));
        console.log("Fuck: ", await str);
        return str;
      })();
      console.log("materials: ",materials);
      return res.status(201).json(JSON.parse(materials));
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

export default ScannerController;