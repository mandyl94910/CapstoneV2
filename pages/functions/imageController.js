// C:\proj309\CapstoneV2\pages\functions\imageController.js
const multer = require('multer');
//File reading, writing, deleting, modifying, checking for existence
const fs = require('fs');
const adminId = 1;

//followings are from <chatgpt>
//Multer is a middleware usually used for uploading files. 
//Storage Management: It provides a variety of storage options, 
//including in-memory storage and disk storage. 
//You can choose to store uploaded files in the server's memory or directly to disk.

//We'll use multer to store photos, etc. for now. In the future we plan to use cloud storage.
//Configuring multer storage

// Define the custom storage configuration
const sellerAvatarStorage  = multer.diskStorage({
    //define the directory of file
    destination: (req, file, cb) => {
        const dir = './public/images/admin';
        //If the directory does not exist, it will be created next.
        if (!fs.existsSync(dir)) {
            //The mkdirSync() method synchronizes the creation of the directory
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    //custom name the fileby admin id
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
        const productId = req.params.productId;  
        const dir = `./public/images/product/${categoryId}/${productId}`;

        if (!fs.existsSync(dir)) {
            //mkdirSync means that if the parent directory also does not exist, recursively create all directories.
            fs.mkdirSync(dir, { recursive: true });
        }
        //callback:asynchronous return
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const categoryId = req.body.category_id;
        const productId = req.params.productId;  
        //check if req.files exist otherwise set it to 0
        const fileIndex = req.files ? req.files.length : 0; 
        // Construct filenames according to naming conventions
        const filename = `${fileIndex}.webp`;
        const filePath = `./public/images/product/${categoryId}/${productId}/${filename}`;

        // Check if the file already exists and delete the old one if it does
        //if filepath exists err=null, go through the if branch, delet existing one and name it
        //if file path doesnt exists, go through the esle branch, directly name the file
        //F_OK check if the file exits
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
            console.log("File already exists. Deleting old file:", filePath);
            //delete the file
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                console.error("Error deleting old file:", unlinkErr);
                return cb(unlinkErr); // Returns an error and stops the operation
                }
                console.log("Old file deleted successfully.");
                //call back function. null means theres no error and return the filename
                cb(null, filename); 
            });
            } else {
            cb(null, filename); // If the file does not exist, set the name of the new file directly
            }
        });
    }
});

// Product image multer configuration
const productUpdateStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const categoryId = req.body.category_id;
        const productId = req.params.productId;  
        const dir = `./public/images/product/${categoryId}/${productId}`;

        if (!fs.existsSync(dir)) {
            console.log(`Creating directory: ${dir}`);
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const categoryId = req.body.category_id;
        const productId = req.params.productId;
        // Use slotIndex from the request to determine the file name
        const fileIndex = file.originalname.split('-')[0]; // Default can be replaced with a fallback filename logic

        const filename = `${fileIndex}.webp`;
        const filePath = `./public/images/product/${categoryId}/${productId}/${filename}`;

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                console.log("File already exists. Deleting old file:", filePath);
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error("Error deleting old file:", unlinkErr);
                        return cb(unlinkErr);
                    }
                    console.log("Old file deleted successfully.");
                    cb(null, filename);
                });
            } else {
                cb(null, filename);
            }
        });
    }
});


// Exporting a multer instance configured with a custom storage engine
const uploadSellerAvatar  = multer({ storage: sellerAvatarStorage  });
const uploadProductImage = multer({ storage: productImageStorage });
const updateProductImage = multer({ storage: productUpdateStorage });

module.exports = { uploadSellerAvatar,uploadProductImage,updateProductImage   };