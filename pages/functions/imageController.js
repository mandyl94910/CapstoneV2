// C:\proj309\CapstoneV2\pages\functions\imageController.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const adminId = 1;

//followings are from <chatgpt>
//Multer is a middleware usually used for uploading files. 
//It parses the request for multipart/form-data data, 
//which is a common encoding type used when uploading files.
//Storage Management: It provides a variety of storage options, 
//including in-memory storage and disk storage. 
//You can choose to store uploaded files in the server's memory or directly to disk.
//We'll use multer to store photos, etc. for now. In the future we plan to use cloud storage.
//Configuring multer storage
// Define the storage configuration
const sellerAvatarStorage  = multer.diskStorage({
    //This initializes the storage engine for Multer, 
    //specifically defining how and where to store the uploaded files. 
    //It uses the diskStorage method to store files on the disk.
    destination: (req, file, cb) => {
        //Used to determine the directory where the uploaded file is saved. 
      //Contains the “HTTP request object req”, the “uploaded file object file”, and the callback function “cb”.  
        const dir = './public/images/admin';
        //If the directory does not exist, it will be created next.
        if (!fs.existsSync(dir)) {
            //The mkdirSync() method synchronizes the creation of the directory
            fs.mkdirSync(dir, { recursive: true });
        }
        //Passes the destination directory dir as the second 
    //argument, and null as the first argument to indicate that 
    //there is no error.Multer uses this callback to indicate 
    //that the file should be saved to the specified directory.
        cb(null, dir);
    },
    //Decide how uploaded files should be named
    filename: (req, file, cb) => {
        const filename = `${adminId}.webp`;
        console.log(`File will be saved as: ${filename}`);
        cb(null, filename);
    }
});

// Product image multer configuration
const productImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const categoryId = req.body.category_id;
        const dir = `./public/images/product/${categoryId}`;

        console.log("Creating directory for category ID:", categoryId, "at", dir);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const categoryId = req.body.category_id;
        const productId = req.params.productId;  // 从req中获取产品ID
        // 获取当前文件在同一上传批次中的索引号，此处依赖于上传时客户端的字段设置
        const fileIndex = req.files ? req.files.length : 0; // 获取当前文件索引，作为文件序号
        // 按照命名规则构造文件名
        const filename = `${categoryId}${productId}${fileIndex}.webp`;
        const filePath = `./public/images/product/${categoryId}/${filename}`;

        // 检查文件是否已存在，存在则删除
        // 检查文件是否已存在，若存在则删除旧文件
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
            console.log("File already exists. Deleting old file:", filePath);
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                console.error("Error deleting old file:", unlinkErr);
                return cb(unlinkErr); // 返回错误，停止操作
                }
                console.log("Old file deleted successfully.");
                cb(null, filename); // 设置新文件的名称
            });
            } else {
            cb(null, filename); // 如果文件不存在，直接设置新文件的名称
            }
        });
    }
});

// Export multer configured with the custom storage engine
const uploadSellerAvatar  = multer({ storage: sellerAvatarStorage  });
const uploadProductImage = multer({ storage: productImageStorage });

module.exports = { uploadSellerAvatar,uploadProductImage   };