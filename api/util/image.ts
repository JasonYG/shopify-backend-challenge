require("dotenv").config();
import AWS from "aws-sdk";
import Image from "../models/image";

// Note: this tutorial was consulted in creating this util function: https://medium.com/@mayneweb/upload-a-base64-image-data-from-nodejs-to-aws-s3-bucket-6c1bd945420f
export const uploadImageToS3 = async ({
  key,
  encoding,
}: {
  key: string;
  encoding: string;
}): Promise<string> => {
  // Configure AWS to use my credentials
  const {
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    AWS_REGION,
    S3_BUCKET,
  } = process.env;
  AWS.config.setPromisesDependency(require("bluebird"));
  AWS.config.update({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });

  // Get image extension
  const extension = encoding.split(";")[0].split("/")[1];

  // Format the image to proper base 64
  const base64Data = Buffer.from(encoding.split("base64,")[1], "base64");

  // Create S3 instance
  const S3 = new AWS.S3();

  // Configure S3 params
  const params = {
    Bucket: S3_BUCKET!,
    Key: key,
    Body: base64Data,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: `image/${extension}`,
  };

  let imageUrl = "";

  try {
    const { Location } = await S3.upload(params).promise();
    imageUrl = Location;
  } catch (error) {
    console.error(error);
  }
  return imageUrl;
};

export const saveImageToDB = async ({
  imageS3Url,
  name,
  price,
  username
}: {
  imageS3Url: string;
  name: string;
  price: number;
  username: string;
}) => {
  // Remove duplicates with the same name
    await Image.find({name}).deleteMany().exec();
    return Image.create({
        s3Url: imageS3Url,
        name,
        price,
        username,
        status: "inventory"
    })
};

export const getImagesFromUsername = (username) => {
  return Image.find({username});
}

export const updateImagePrice = ({ name, updatedPrice, username}) => {
  return Image.findOneAndUpdate({name, username}, {price: updatedPrice});
}

export const setImageForSale = (id) => {
  return Image.findOneAndUpdate({_id: id}, {status: 'selling'});
}
export const getSellingImages = () => {
  return Image.find({status: 'selling'});
}
export const buyImage = (id) => {
  return Image.findOneAndUpdate({_id: id}, {status: 'sold'});
}