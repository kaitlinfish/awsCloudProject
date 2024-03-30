const AWS = require('aws-sdk');


exports.handler = async (event) => {

    const s3 = new AWS.S3();

    const { action, fileName, fileContent } = JSON.parse(event.body);

    try {
        if (action === 'read') {
            const params = {
                Bucket: 'awsfilestorageproject2024', 
                Key: fileName
            };
            const data = await s3.getObject(params).promise();
            return {
                statusCode: 200,
                body: JSON.stringify({ fileContent: data.Body.toString('utf-8') })
            };
        } else if (action === 'write') {
            const params = {
                Bucket: 'awsfilestorageproject2024', 
                Key: fileName,
                Body: fileContent
            };
            await s3.putObject(params).promise();
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'File written successfully' })
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid action' })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to perform action', error: error })
        };
    }
};
