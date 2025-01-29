import express from "express";
import db from "../config/dbControl.js";
import upload from "../controllers/uploadControllers.js";
import cloudinary from "../config/cloudinaryConfig.js";
const uploadDocumentRouter = express.Router();

uploadDocumentRouter.post('/uploading', upload.single('file'), async function(req, res) {
    console.log(req.body);
    const file = req.file.path;
    const uploadResult = await cloudinary.uploader
    .upload(file)
    .catch((error) => {
      console.log(error);
    });
    console.log(uploadResult);
   res.send('File uploaded successfully');
});

export default uploadDocumentRouter;
