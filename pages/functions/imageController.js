// imageController.js
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
        const categoryId = req.body.category_id;  // Get categoryId from the request body
        const dir = `./public/images/product/${categoryId}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });// Create the directory if it does not exist
            console.log(`Directory created: ${dir}`);
        }
        cb(null, dir);// Set the destination for uploaded files
    },
    filename: (req, file, cb) => {
        const productId = req.body.product_id;  // productId may be auto-generated, temporarily use a placeholder
        const filename = `${productId}.webp`;   // Use product_id as the filename
        cb(null, filename);
    }
});

// Export multer configured with the custom storage engine
const uploadSellerAvatar  = multer({ storage: sellerAvatarStorage  });
const uploadProductImage = multer({ storage: productImageStorage });

module.exports = { uploadSellerAvatar,uploadProductImage   };