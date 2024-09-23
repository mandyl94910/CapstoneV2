//C:\CPRG306\CapstoneV2\pages\functions\user\AdminController.js
const db = require('../../../server/db');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
//Set the adminid to variable first, since there may be different admins later.
const adminId = 1;

// Function name: getAdminInformation
// Description: Retrieves admin details (name, title, image) from the database.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object for sending back the retrieved admin data.
// Functionality:
//   This function queries the database for admin information based on a hardcoded admin ID (1).
//   If the admin data is found, it sends the details (name, title, image) as a JSON response.
//   In case of errors, it logs the error and sends a 500 status response with an error message.
//   If no data is found, it sends a 404 status with a "No admin information found" message.
async function getAdminInformation(req, res) {
    db.query('SELECT name, title, image FROM admin WHERE id = 1', (err, results) => {
        if (err) {
            console.error("Database query failed:", err);
            res.status(500).send({ message: 'Failed to retrieve admin information', error: err.message });
            return;
        }
        if (results.rows.length > 0) {
            //sending the objects
            res.json(results.rows[0]);  
        } else {
            res.status(404).send({ message: 'No admin information found' });
        }
    });
}

// Function name: updateAdminDetails
// Description: Updates the admin's details including name, title, and avatar image.
// Parameters:
//   req (object): The HTTP request object, containing the new name, title, and file (avatar).
//   res (object): The HTTP response object for sending back success or error messages.
// Functionality:
//   This function handles updates to the admin's name, title, and avatar image.
//   If an image is uploaded, the file is processed and saved to the server.
//   The function updates the admin details in the database with the new name, title, and image path.
//   Errors during the process are caught and handled with appropriate responses.

//Multer is a middleware usually used for uploading files. 
//It parses the request for multipart/form-data data, 
//which is a common encoding type used when uploading files.
//Storage Management: It provides a variety of storage options, 
//including in-memory storage and disk storage. 
//You can choose to store uploaded files in the server's memory or directly to disk.
//We'll use multer to store photos, etc. for now. In the future we plan to use cloud storage.

async function updateAdminDetails (req, res) {
    const { name, title } = req.body;
    // Multer handles file upload and makes it accessible via req.file
    const file = req.file;
    console.log('Received data to update:', { name, title, file }); 
    try {
        let imagePath = null; // Define it as null first
        //Because we're going to try to store the new avatar first, return the new path and name after storing it, 
        //and then store it in the database, we'll set it to null first
        // Upload an avatar and get the path
        if (file) {
            imagePath = await uploadAvatar(file,adminId);
            console.log('Image path after upload:', imagePath); 
        }

        // Update the database with new admin details
        const result = await saveAdminDetailsToDatabase(name, title, imagePath, adminId);
        console.log('Database update result:', result); 

        res.send({ message: 'Admin details updated successfully!' });
    } catch (error) {
        console.error('Error updating admin details:', error);
        res.status(500).send({ message: 'Failed to update admin details.' });
    }
};

// Function name: uploadAvatar
// Description: Uploads the admin's avatar image to a specific location on the server.
// Parameters:
//   file (object): The uploaded file object containing the file path and metadata.
//   adminId (number): The ID of the admin whose avatar is being uploaded.
// Functionality:
//   This function takes the uploaded file and moves it to a designated directory (`public/images/admin/`),
//   renaming it to match the admin's ID. It returns the relative path to the uploaded file, which can be
//   stored in the database for later retrieval.
// Example:
//   A file uploaded for admin with ID 1 will be renamed to `1.webp` and stored in `/public/images/admin/1.webp`.
async function uploadAvatar(file, adminId) {
    if (!file) {
        throw new Error('No file uploaded');
    }
    // Set the destination path for the file and rename it based on adminId
    const newPath = path.join('public/images/admin/', `${adminId}.webp`); // 使用传入的 adminId
    const tempPath = file.path;

    // Move and rename the file to the new location
    fs.renameSync(tempPath, newPath);
    return `admin/${adminId}.webp`; // Return the relative path
}

// Function name: saveAdminDetailsToDatabase
// Description: Updates the admin's name, title, and avatar image path in the database.
// Parameters:
//   name (string): The new name for the admin.
//   title (string): The new title for the admin.
//   imagePath (string|null): The path to the new avatar image (or null if no image is provided).
//   adminId (number): The ID of the admin whose details are being updated.
// Functionality:
//   This function updates the database with the admin's new name, title, and avatar image path.
//   It executes an SQL query with the provided values, and returns a promise that resolves when the
//   query completes successfully, or rejects with an error if the query fails.
// Example:
//   Given adminId = 1, it updates the `admin` table where `id = 1` with the new name, title, and image path.
function saveAdminDetailsToDatabase(name, title, imagePath,adminId) {
    return new Promise((resolve, reject) => {
        // SQL query to update admin information in the database
        const query = 'UPDATE admin SET name = $1, title = $2, image = $3 WHERE id = $4';
        const values = [name, title, imagePath, adminId]; 
        console.log(`Executing query: ${query} with values: ${values}`);// // Log the query and values
        db.query(query, values, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

module.exports = {
    getAdminInformation,
    updateAdminDetails
  };