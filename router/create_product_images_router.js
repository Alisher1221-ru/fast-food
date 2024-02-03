import { Router } from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import { getImg, uploadImg } from "../controller/create_product_images_controller.js";

const uploadRoute = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

uploadRoute.post('/', upload.single('file'), uploadImg);
uploadRoute.get('/:filename', getImg)

export default uploadRoute;
