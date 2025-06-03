import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { UpdatePhotoUrlFromRedux } from '../../../../ReduxToolkit/Slices/PhotoSlice.jsx';

const PhotoUpload = ({ photoid: photoid }) => {
  const dispatch = useDispatch();
  const [File, setFile] = useState(null)
  const [CurrentImage, setCurrentImage] = useState(null)

  const UploadPhoto = async () => {
    console.log("Uploading photo");
    const formData=new FormData();
    console.log("File", File);
    formData.append("VerficationPhoto",File);
    console.log("Form Data", formData);

     try {
    const res = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData, // DO NOT SET Content-Type manually
    });

    const data = await res.json();
    console.log("Response from server", data);

    const payload = {
      PhotoId: photoid,
      PhotoUrl: data.Url, // Make sure backend sends { url: "..." }
    };

    dispatch(UpdatePhotoUrlFromRedux(payload));
  } catch (error) {
    console.error("Upload failed", error);
  }


  }
  const phtotoUrl = useSelector((state) => {
    return state.photo.Photos.find((photo) => photo.id === photoid).PhotoUrl
  })
  return (
    <div>
      <img src={phtotoUrl} alt="" />
      <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" />
      <button className='border p-5 rounded-2xl' onClick={UploadPhoto}>Upload</button>
    </div>
  )
}
export default PhotoUpload