import React, { Component } from "react";
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import contract from '../contracts/ClimateNFT.json';
import {useRef} from 'react';
import { onFileUpload, loadData } from '../services/apiClient';


const useInputChange = (initialState) => {
  const [userInput, setUserInput] = useState(initialState);

  const handleEvent = (e) => {
    const input = e.target.value;
    setUserInput(input);
  }
  return [userInput, handleEvent];}

const useFileUpload = (initialState) => {
  const [uploaded, setUploaded] = useState(initialState)
  const handleEvent = (e) => {
    const input = e.target.files[0];
    setUploaded(input);
  }
  return [uploaded, handleEvent];}

function App() {
  const [name, setName] = useInputChange("")
  const [description, setDescription] = useInputChange("")
  const [image, setImage] = useFileUpload(null)

  // On file upload (click the upload button)
  const onSubmit = (e) => {
    e.preventDefault()
   
    // Build multipart/form-data
    const formData = new FormData();
   
    // Update the formData object

    formData.append("selectedImage", image);
    formData.append("imageName", name);
    formData.append("imageDescription", description);

    onFileUpload(formData);
  };

  return (
    <div className='App'>
      <div className='main-app'>
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{ backgroundImage: "url(https://www.coindesk.com/resizer/uAcQrY4TkwR3dGCtcXo4zAyQfIA=/arc-photo-coindesk/arc2-prod/public/TA6CWB3BBNA5LFZZZBNRKMFQ5A.jpg)"}}>
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
            <div className="text-center">
              <h2 className="mt-5 text-3xl font-bold text-green-900">
                NFTs For Climate Change
              </h2>
              <p className="mt-2 text-sm text-gray-400">To participate take a picture of yourself planting trees</p>
            </div>

            {/* Start Form */}
            <form className="mt-8 space-y-3" onSubmit={ onSubmit} action="/mint">
            <div className="grid grid-cols-1 space-y-2">
                {/* <label className="text-sm font-bold text-gray-500 tracking-wide">Title</label> */}
                <input onChange={ setName } id="title" className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" name="title" type="text" placeholder="Name" />
              </div>
              <div className="grid grid-cols-1 space-y-2">
                {/* <label className="text-sm font-bold text-gray-500 tracking-wide">Place</label> */}
                <input onChange={setDescription} id="location" className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" name="location" type="text" placeholder="Description" />
              </div>
              <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold text-green-900 tracking-wide">Attach Photo</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">

                      <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        <img className="h-36 object-center" src="https://media.istockphoto.com/id/1188694937/vector/ecology-concept-people-take-care-about-planet-ecology-protect-nature-and-ecology-banner.jpg?b=1&s=612x612&w=0&k=20&c=DGxNUPfL8lgwYv1a7qG698rmGsfjo4Ow_rmOdn3fhzs=" alt="freepik image" style={{position: "absolute", clip: "rect(10px, 150px, 130px, 10px)"}}/>
                      </div>
                      <p className="pointer-none text-green-800 ">Click the Image to upload<br /> from your computer</p>
                    </div>
                    <input onChange={setImage} type="file" name="myImage" className="hidden" />
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                <span>File type: svg, png</span>
              </p>
              <div>
                <input type="submit" value="Upload" className="my-5 w-full flex justify-center bg-green-500 text-gray-100 p-4  rounded-full tracking-wide
                                        font-semibold  focus:outline-none focus:shadow-outline hover:bg-green-600 shadow-lg cursor-pointer transition ease-in duration-300"/>
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
      </div>
    </div>
  )}
  
export default App;
