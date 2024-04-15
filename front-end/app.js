/**Description: Middleware code between UI and AWS services */
import axios from 'axios';
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>


//function that handles file uploads
function uploadFile(file) {
   
    const apiEndpoint = '';
    
    console.log('File selected:', file.name);
    
    const formData = new FormData();
    formData.append('file', file);
    
    fetch(apiEndpoint, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to upload file');
        }
        return response.json();
    })
    .then(data => {
        console.log('File uploaded successfully:', data);
       
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        // Handle error here
    });
}

//Function to download files 
function downloadFile() {
    const apiEndpoint = 'https://7phog1l14l.execute-api.us-east-1.amazonaws.com/dev';

    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to download file');
            }
            return response.json();
        })
        .then(data => {
            const fileContent = data.fileContent; 
            const fileInput = document.getElementById('fileName');
            fileInput.style.display = 'none';
            const fileContentDiv = document.getElementById('fileContent');
            fileContentDiv.style.display = 'block';
            const textContent = document.getElementById('textContent');
            textContent.value = fileContent;
            console.log('File downloaded successfully:', data);
        })
        .catch(error => {
            console.error('Error downloading file:', error);
            alert('Failed to download file. Please try again.');
           
        });
}

// Function to fetch and display the list of uploaded files
async function fetchFiles() {
    try {
        const response = await fetch('https://nzlkxf3450.execute-api.us-east-1.amazonaws.com/dev');
        if (!response.ok) {
            throw new Error('Failed to fetch file list');
        }
        const data = await response.json();
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = ''; // Clear previous list
        data.forEach(file => {
            const listItem = document.createElement('li');
            listItem.textContent = file.fileName;
            // Attach event listener to each file item
            listItem.addEventListener('click', function() {

                // Perform read or read/write action on the clicked file
                const endpoint = file.permissions === 'read_write' ? 'https://epha0wkn52.execute-api.us-east-1.amazonaws.com/dev' : 'https://lmwni800xi.execute-api.us-east-1.amazonaws.com/dev';
                fetch(endpoint, {
                    method: 'POST',
                    body: JSON.stringify({ action: 'read', fileName: file.fileName })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Successfully fetched files')
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
            fileList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

/*****Event Listener's*/

// event listener for file uploads 
document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileName');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }
    uploadFile(file);
});
//event listener for file downloads 
document.getElementById('downloadButton').addEventListener('click', function() {
    const fileContent = '%fileContent'; 
    const fileInput = document.getElementById('fileName');
    fileInput.style.display = 'none';
    const fileContentDiv = document.getElementById('fileContent');
    fileContentDiv.style.display = 'block';
    const textContent = document.getElementById('textContent');
    textContent.value = fileContent;
     downloadFile();
});

document.addEventListener('DOMContentLoaded', fetchFiles);
