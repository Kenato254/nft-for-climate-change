import useState from "react";
import axios from 'axios';

export const onFileUpload = async (state) => {

	await axios({
		method: "post",
		url: "http://localhost:8000/upload/", 
		data: {
			name: state.get("imageName"), 
			description: state.get("imageDescription"),
			imageFile: state.get("selectedImage")
			},
		headers: { "Content-Type": "multipart/form-data" },
	})
	  .then(response => {
	  	(async() => {
	  		const tempData = await response.data;
	      localStorage.setItem("ipfsData", JSON.stringify(tempData));
	  	})();
	  	console.log(response.data);
	  })
	  .catch(error => {
	    if (error.response) {
	      //response status is an error code
	      console.error("response status: ",error.response.status);
	    }
	    else if (error.request) {
	      //response not received though the request was sent
	      console.error("request error: ", error.request);
	    }
	    else {
	      //an error occurred when setting up the request
	      console.error("error message: ", error.message);
	    }
	  });
}

