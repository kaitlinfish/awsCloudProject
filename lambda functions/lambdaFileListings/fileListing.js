const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    const params = {
        Bucket: 'awsfilestorageproject2024' 
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        const fileList = data.Contents.map(item => item.Key);
        return {
            statusCode: 200,
            body: JSON.stringify({ fileList: fileList })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to list files', error: error })
        };
    }
};
