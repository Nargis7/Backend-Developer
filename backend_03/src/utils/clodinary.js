import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
  try{

    if(!localFilePath) return null;
    // upoad the file on cloudinary
    const response =  await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    })
    // file has been uploaded 
    console.log('file uploaded to cloudinary successfully', response.url);
    return response;

  } catch(error){
     fs.unlinkSync(localFilePath); // remove the file from local uploads folder
     return null;

  }
}

export {uploadToCloudinary};
