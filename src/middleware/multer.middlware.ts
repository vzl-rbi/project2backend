import { Request, Response } from "express";
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req:Request, file:Express.Multer.File, cb:any) => {
    const allowedFileType = ["image/png", "image/jpg", "image/jpeg"];
     if (!allowedFileType.includes(file.mimetype)) {
      cb(new Error("This filetype is not supported!!"));
      return;
    }
     cb(null, "./src/uploads"); //cb(error, success)
  },
  filename: (req:Request, file:Express.Multer.File, cb:any) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
})
export {multer, storage}