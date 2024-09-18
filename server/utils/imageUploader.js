const cloudinary =require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: "dkynwi65w", 
    api_key: '866237411924499', 
    api_secret: 'JHmhpFOvw3IrWgkVhP9JtvIKt2U'
  });

exports.uploadImageToCloudinary = async(file,folder,height,quality)=>{

    const options={folder};
    if(height){
        options.height=height;
    }
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";

    return await cloudinary.uploader.upload(file.tempFilePath,options);


}
