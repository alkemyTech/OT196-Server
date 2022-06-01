require("dotenv").config();

// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");

// Set the region
AWS.config.update({ region: process.env.AWS_REGION });

// Create S3 service object
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// List objects in the bucket
var params = {
  Bucket: process.env.AWS_BUCKET_NAME,
};
s3.listObjects(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data); // successful response
});
