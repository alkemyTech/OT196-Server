require("dotenv").config();

// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");

const path = require("path");

// for the file upload functionality
const fs = require("fs");

// Set the region
AWS.config.update({ region: process.env.AWS_REGION });

// Get a random alphanumeric combination
const randomKeyGenerator = () => {
  return (
    Math.random().toString(36).substr(2, 3) +
    "-" +
    Math.random().toString(36).substr(2, 3) +
    "-" +
    Math.random().toString(36).substr(2, 4)
  );
};

// Create S3 service object
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Upload a file to the bucket
const uploadFile = (fileName) => {
  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: randomKeyGenerator() + path.basename(fileName),
    Body: fileContent,
  };

  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

// Upload example: uncomment the next line if you want to try it and put the image you want to test as a parameter.
// uploadFile("img.jpg")

// // List objects in the bucket
// var paramsList = {
//   Bucket: process.env.AWS_BUCKET_NAME,
// };
// s3.listObjects(paramsList, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else console.log(data); // successful response
// });

module.exports = { uploadFile };
