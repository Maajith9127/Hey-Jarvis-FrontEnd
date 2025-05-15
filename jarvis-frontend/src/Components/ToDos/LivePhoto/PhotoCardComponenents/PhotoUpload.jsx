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

    const Reader = new FileReader()
    console.log("File", File);
    Reader.readAsDataURL(File)
    Reader.onloadend = async () => {
      const file = Reader.result
      try {
        const res = await fetch("http://localhost:3000/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file: file }),
        });

        const data = await res.json();

        const payload = {
          PhotoId:photoid,
          PhotoUrl:data.Url
        }
        dispatch(UpdatePhotoUrlFromRedux(payload))
        // Show uploaded image
      }
      catch (error) {
        
      }
    }
  }
const phtotoUrl=useSelector((state)=>{
  return state.photo.Photos.find((photo)=>photo.id===photoid).PhotoUrl})

  return (
    <div>

      <img src={phtotoUrl} alt="" />
      <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" />

      <button className='border p-5 rounded-2xl' onClick={UploadPhoto}>Upload</button>
    </div>
  )
}

export default PhotoUpload