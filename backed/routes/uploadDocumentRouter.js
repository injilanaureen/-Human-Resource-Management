import express from "express";
import db from "../config/dbControl.js";
import upload from "../controllers/uploadControllers.js";
import cloudinary from "../config/cloudinaryConfig.js";
const uploadDocumentRouter = express.Router();

uploadDocumentRouter.post('/uploading', upload.single('file'), async function(req, res) {
  try {
    const { title, user_id } = req.body;
    const status = 'Pending';
    const file = req.file.path;
    const date = new Date();
    const mysqlFormattedDate = date.toISOString().slice(0, 19).replace("T", " ");

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file, {
      resource_type: "raw", // Ensures Cloudinary treats PDFs correctly
    });
    const filename = uploadResult.secure_url; // Get the file URL

    console.log(filename);

    // Correct MySQL Query Execution
    const insertDoc = `INSERT INTO upload_document (doc_title, doc_url, doc_status, doc_apply_date, emp_id) VALUES (?, ?, ?, ?, ?)`;

    db.query(insertDoc, [title, filename, status, mysqlFormattedDate, user_id], function (err, docResult) {  
      if (err) {
        console.error('Database Insert Error:', err);
        return res.status(500).json({ message: 'Database error', error: err });
      }
      console.log('Document uploaded successfully');
      res.status(200).json({ message: 'File uploaded successfully', fileUrl: filename });
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
});
uploadDocumentRouter.get('/getdocuments/:user_id', async function (req, res) {
  try {
    const { user_id } = req.params;

    // MySQL query to fetch documents by user_id
    const selectDocs = `SELECT doc_id, doc_title, doc_url, doc_status, doc_apply_date FROM upload_document WHERE emp_id = ? ORDER BY doc_apply_date DESC`;

    db.query(selectDocs, [user_id], function (err, results) {
      if (err) {
        console.error('Database Fetch Error:', err);
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'No documents found for this user' });
      }
      res.status(200).json({ documents: results });
    });
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Error fetching documents', error: error.message });
  }
});

export default uploadDocumentRouter;
