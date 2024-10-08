import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        //file has been uploaded successfully
        // console.log("File has been uploaded successfully on cloudinary", response.url);

        // remove the locally saved temporary file
        // after you get console log after uploading
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error){
        fs.unlinkSync(localFilePath);
        // remove the locxally saved temporary file 
        // as the upload operation has failed
        return null;
    }
}

export { uploadOnCloudinary }