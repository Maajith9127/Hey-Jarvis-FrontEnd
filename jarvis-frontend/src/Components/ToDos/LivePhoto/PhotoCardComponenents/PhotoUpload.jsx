
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdatePhotoUrlFromRedux } from '../../../../ReduxToolkit/Slices/PhotoSlice.jsx';
import { uploadVerificationPhoto } from '../../../../services/verifyLivePhoto.js' // ✅ import service

const PhotoUpload = ({ photoid }) => {
  const dispatch = useDispatch();
  const [File, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const UploadPhoto = async () => {
    if (!File) return;

    setIsUploading(true);
    try {
      console.log("📤 Uploading photo...");
      const data = await uploadVerificationPhoto(File); // ✅ service call
      console.log("✅ Upload response:", data);

      const payload = {
        PhotoId: photoid,
        PhotoUrl: data.Url, // backend must return { Url: "..." }
      };
      dispatch(UpdatePhotoUrlFromRedux(payload));
    } catch (error) {
      console.error("❌ Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const phtotoUrl = useSelector((state) =>
    state.photo.Photos.find((photo) => photo.id === photoid)?.PhotoUrl || ""
  );

  return (
    <div className="text-center">
      {phtotoUrl ? (
        <div className="mb-6">
          <img
            src={phtotoUrl}
            alt="Uploaded photo"
            className="max-w-full h-48 object-cover rounded-lg mx-auto border border-gray-200"
          />
        </div>
      ) : (
        <div className="mb-6 py-12">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
          <p className="text-gray-500 mb-2">No photo uploaded</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id={`file-upload-${photoid}`}
          />
          <label
            htmlFor={`file-upload-${photoid}`}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg transition-colors duration-200 cursor-pointer font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Choose Photo
          </label>
        </div>

        {File && (
          <div className="text-sm text-gray-600 mb-4">Selected: {File.name}</div>
        )}

        <button
          onClick={UploadPhoto}
          disabled={!File || isUploading}
          className={`inline-flex items-center gap-2 py-2.5 px-6 rounded-lg font-medium transition-all duration-200 ${File && !isUploading
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {isUploading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Photo
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PhotoUpload;
