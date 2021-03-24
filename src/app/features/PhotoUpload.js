import React, { useState } from 'react';
import { storage } from '../../index';
import { EXIF } from 'exif-js';
//npm install exif-js --save for installing exif js

function PhotoUpload() {
  //declares names in state, set to empty string
  const [imageAsFile, setImageAsFile] = useState(null);
  const [imageAsUrl, setImageAsUrl] = useState('');

  //When photo is uploaded, grab data and set to state
  const handleImageAsFile = (e) => {
    // const image = e.target.files[0];
    setImageAsFile(e.target.files[0]);
    // console.log(e.target.files[0]);
    EXIF.getData(e.target.files[0], function () {
      if (e.target.files[0].exifdata) {
        //HOW ARE WE SAVING THE DATA TO STORAGE?
        //[{coordinate:string, name:string}]
        //THEN WE CAN ACCESS THIS INFO IN OUR MAP COMPONENT
        //how are we accesing this info?  which component?
        //convert to coordinates
        console.log('METADATA', e.target.files[0].exifdata);
      } else {
        //WHAT WOULD BE OUR ALTERNATIVE ?  DO WE ALLOW NULL?  IS THAT EVEN A POSSIBILITY?
      }
    });
  };

  const handleFirebaseUpload = (e) => {
    e.preventDefault();
    //upload file to firebase storage
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);

    //initiates the firebase side uploading
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapshot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets storage reference from image storage in firebase
        // gets the download url from firebase file path
        // sets the image from firebase as a URL onto local state
        storage
          .ref('images')
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((firebaseUrl) => {
            setImageAsFile(null);
            setImageAsUrl(firebaseUrl);
          });
      }
    );
  };

  return (
    <div className='photo-upload'>
      <h1>Upload a photo</h1>
      <form onSubmit={handleFirebaseUpload}>
        <input
          type='file'
          onChange={handleImageAsFile}
          accept='image/png, image/jpeg, image/jpg'
        />
        <button>Upload</button>
      </form>
      <img src={imageAsUrl} alt='' />
    </div>
  );
}

export default PhotoUpload;
