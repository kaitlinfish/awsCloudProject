/**Description: Lambda function for handling read only permissions */
const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const s3 = new AWS.S3();

    const params = {
        Bucket: 'awsfilestorageproject2024', 
        Key: event.fileName 
    };

    try {
        const data = await s3.getObject(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ fileData: data.Body.toString('base64') })
        };
    } catch (error) {
        return {
            statusCode: 403, // Forbidden status code for read-only access
            body: JSON.stringify({ message: 'Failed to read file', error: error })
        };
    }
};