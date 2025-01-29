// import React, { useState } from 'react';
// import axios from 'axios';

// const HRDocuments = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [file, setFile] = useState(null); // Store a single file
//   const [title, setTitle] = useState('');

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]); // Update the file state with the selected file
//   };

//   const handleOk = async () => {
//     if (!file) {
//       alert("Please select a file to upload");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('title', title);

//     try {
//       console.log('File uploaded successfully:', title); // Log the response from the server
//       alert("File uploaded successfully!");
//       setIsModalVisible(false); // Close modal on successful upload
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert("Error uploading file. Please try again.");
//     }
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <div>
//       <button
//         onClick={showModal}
//         className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
//       >
//         Documents
//       </button>

//       {isModalVisible && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-8 rounded-lg shadow-xl w-96">
//             <h2 className="text-xl font-semibold mb-4">Update Document</h2>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Document Title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter document title"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Upload Document</label>
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg"
//               />
//             </div>

//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleOk}
//                 className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
//               >
//                 Upload
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HRDocuments;
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FiUploadCloud, FiX, FiCheckCircle, FiFile } from 'react-icons/fi';

const HRDocuments = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  // File validation
  const validateFile = (file) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/plain'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid file type (PDF, JPG, PNG, TXT)');
      return false;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    // Create FormData object
    const formData = new FormData();
    formData.append('file', file); // Append the file
    formData.append('title', title); // Append the title

    try {
      // Make API call to backend
      const response = await axios.post('http://localhost:5000/api/upload/uploading', formData);

      console.log('Upload response:', response.data); // Log the response from the backend

      setUploadStatus('success');
      setTimeout(() => {
        setIsModalVisible(false);
        setUploadStatus(null);
        setFile(null);
        setTitle('');
      }, 2000);
    } catch (error) {
      setUploadStatus('error');
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalVisible(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
        aria-label="Upload documents"
      >
        <FiUploadCloud className="w-6 h-6" />
        <span className="text-sm hidden md:inline">Upload Document</span>
      </button>

      {/* Modal Overlay */}
      {isModalVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setIsModalVisible(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">Upload New Document</h2>
              <button 
                onClick={() => setIsModalVisible(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Employee Handbook 2023"
                />
              </div>

              {/* File Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document File <span className="text-red-500">*</span>
                </label>
                <div
                  className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all border-gray-300 hover:border-blue-400"
                  onClick={() => fileInputRef.current.click()}
                >
                  <div className="space-y-4">
                    <FiUploadCloud className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-600">
                      Click to upload files<br />
                      or <span className="text-blue-600 font-medium">browse</span>
                    </p>
                    {file && (
                      <div className="mt-4 flex items-center justify-center gap-2 bg-gray-50 p-3 rounded-lg">
                        <FiFile className="text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.txt"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => setIsModalVisible(false)}
                className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-5 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : uploadStatus === 'success' ? (
                  <>
                    <FiCheckCircle className="w-5 h-5" />
                    Success!
                  </>
                ) : (
                  'Upload Document'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRDocuments;