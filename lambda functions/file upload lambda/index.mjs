

const AWS = require('aws-sdk');

exports.handler = async (event) =>  {
    try {
        // Create a new S3 instance
        const s3 = new AWS.S3();

        // Extracting file content and name from the event
        const { fileContent, fileName } = event;
        
        // Creating parameters for uploading the file to S3
        const params = {
            Bucket: 'awsfilestorageproject2024',
            Key: fileName,
            Body: fileContent
        };

        // Uploading file to S3
        const result = await s3.upload(params).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File uploaded successfully', location: result.Location })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to upload file', error: error })
        };
    }
};
