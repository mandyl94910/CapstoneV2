//C:\CPRG306\CapstoneV2\pages\functions\user\AdminController.js
const db = require('../../../server/db');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadSellerAvatar } = require('../imageController');
//Set the adminid to variable first, since there may be different admins later.
//And we may design login and register logic for admin later.
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
    console.log('Uploaded file:', file); // 日志：上传的文件信息
    try {
        let imagePath = null; // Define it as null first
        //Because we're going to try to store the new avatar first, return the new path and name after storing it, 
        //and then store it in the database, we'll set it to null first
        // Upload an avatar and get the path
        if (file) {
            imagePath = `admin/${adminId}.webp`;
            console.log(`Image path set to: ${imagePath}`); // 日志：图片路径
        }else {
            console.log('No file uploaded'); // 日志：没有上传文件
        }

        // Update the database with new admin details
        const result = await saveAdminDetailsToDatabase(name, title, imagePath, adminId);
        console.log('Database update result:', result); // 日志：数据库更新结果
        res.send({ message: 'Admin details updated successfully!' });
    } catch (error) {
        console.error('Error updating admin details:', error);
        res.status(500).send({ message: 'Failed to update admin details.' });
    }
};

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
        db.query(query, values, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

// Function name: changeCredentials
// Description: Updates the admin's credentials (PIN or password) after validating the current credentials provided by the user.
// Parameters:
//   currentValue (string): The current PIN or password entered by the user.
//   newValue (string): The new PIN or password that the user wishes to set.
//   type (string): Specifies whether the user is updating the "PIN" or "Password".
// Functionality:
//   This function retrieves the admin's current PIN or password from the database based on the `adminId` (assumed to be 1).
//   It then compares the provided `currentValue` with the value stored in the database.
//   If the values match, the function updates the corresponding column (PIN or password) in the database with the new value.
//   If there are discrepancies or errors (e.g., mismatched credentials, database issues), the function returns the appropriate status and error message.
//   If successful, the function returns a success message indicating that the PIN or password has been updated.
// Example:
//   When the function receives { currentValue: "1234", newValue: "5678", type: "PIN" }, it first checks if "1234" matches the current PIN stored in the admin table for adminId = 1.
//   If matched, the function updates the PIN to "5678" in the admin's record.
const changeCredentials = async (req, res) => {
    const { currentValue, newValue, type } = req.body;
    
    try {
      // Get the current administrator's information from the database
      const query = `SELECT ${type.toLowerCase()} FROM admin WHERE id = $1`; 
      const result = await db.query(query, [adminId]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      const currentDatabaseValue = result.rows[0][type.toLowerCase()]; 
  
      // Check that the currently entered value matches the value in the database
      if (currentValue !== currentDatabaseValue) {
        return res.status(400).json({ message: `The Current ${type} you input is not correct` });
      }
  
      // Update the corresponding values in the database
      const updateQuery = `UPDATE admin SET ${type.toLowerCase()} = $1 WHERE id = $2`;
      await db.query(updateQuery, [newValue, adminId]);
  
      return res.json({ message: `${type} changed successfully!` });
    } catch (error) {
      console.error('Error updating credentials:', error);
      return res.status(500).json({ message: 'Error updating credentials', error });
    }
  };

module.exports = {
    getAdminInformation,
    updateAdminDetails,
    changeCredentials
  };