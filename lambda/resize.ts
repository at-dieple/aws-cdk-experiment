const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const Sharp = require('sharp');

const BUCKET = 'lv-wallpaper-images/images';

// s3 event
exports.handler = async function(event: any, context: any) {
  // let response = event.Records[0].cf.response;
  let key = event.Records[0].s3.object.key;
  let fileName = key.split('/').pop();
  console.log(fileName);
  console.log(BUCKET);

  // get the source image file
  S3.getObject({ Bucket: BUCKET, Key: key })
    .promise()
    // perform the resize operation
    .then((data: any) =>
      Sharp(data.Body)
        .resize(250, 250)
        .toBuffer()
    )
    .then((buffer: any) => {
      // save the resized object to S3 bucket with appropriate object key.
      S3.putObject({
        Body: buffer,
        Bucket: BUCKET,
        ContentType: 'image/png',
        Key: key
      })
        .promise()
        .catch(() => {
          console.log('Exception while writing resized image to bucket');
        });
    })
    .catch((err: any) => {
      console.log('Exception while reading source image :%j', err);
      console.log(BUCKET);
      console.log(key);
    });
};
