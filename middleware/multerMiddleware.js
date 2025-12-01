import multer from "multer";
import path from "path";
import DataParser from "datauri/parser.js";

const storage = multer.memoryStorage();

// Set up Multer with the storage and file size limit (0.5MB)
const upload = multer({ storage });
const parser = new DataParser();
export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};
export default upload;
