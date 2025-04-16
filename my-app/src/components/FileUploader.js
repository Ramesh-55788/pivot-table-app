import React from 'react';

const FileUploader = ({ onUpload }) => {
    const handleChange = (e) => {
        if (e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleChange} />
        </div>
    );
};

export default FileUploader;
