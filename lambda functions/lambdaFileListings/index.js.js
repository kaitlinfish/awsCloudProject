const AWS = require('aws-sdk');

exports.handler = async (event) => {
    try {
        // Create an S3 instance
        const s3 = new AWS.S3();

        
        const params = {
            Bucket: 'your-s3-bucket-name',
            
        };

        // Call S3 to list objects in the bucket
        const data = await s3.listObjectsV2(params).promise();

        // Extract file names from the response
        const fileList = data.Contents.map(object => object.Key);

        return {
            statusCode: 200,
            body: JSON.stringify({ fileList })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to list files', error: error })
        };
    }
};
