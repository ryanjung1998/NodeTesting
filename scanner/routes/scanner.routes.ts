import { Router } from "express";
import ScannerController from "../controllers/scanner.controller";
import ScannerService from "../services/scanner.service";

const scannerRouter = Router();

const scannerController = new ScannerController(new ScannerService());

scannerRouter.post("/", scannerController.postMaterials);

export default scannerRouter;