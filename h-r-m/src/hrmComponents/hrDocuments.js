import React, { useState } from 'react';
import axios from 'axios';

const HRDocuments = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState(null); // Store a single file
  const [title, setTitle] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (!title) {
      alert('Please enter a document title!');
      return;
    }

    if (!file) {
      alert('Please upload a document.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file); // Use 'file' field to match backend

    // Log the FormData contents
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      // Simulate a successful upload
      alert('Document uploaded successfully!');
      setIsModalVisible(false);
      setTitle('');
      setFile(null); // Clear file only after upload is successful
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to upload document');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Only store the first file
  };

  return (
    <div>
      <button
        onClick={showModal}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
      >
        Documents
      </button>

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4">Update Document</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Document Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter document title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Upload Document</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg"
                value={file ? file.name : ''} // Make sure the value is properly set to file's name or empty
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleOk}
                className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default HRDocuments;
