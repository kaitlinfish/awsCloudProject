const AWS = require('aws-sdk');


exports.handler = async (event) => {
    const s3 = new AWS.S3();

    const params = {
        Bucket: 'awsfilestorageproject2024', 
        Key: event.fileName // Assume fileName is provided in the event
    };

    try {
        const data = await s3.getObject(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ fileData: data.Body.toString('base64') })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to download file', error: error })
        };
    }
};
