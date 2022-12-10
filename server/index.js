// server/index.js

const express = require("express");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const app = express();
const path = require("path");
const Blockfrost = require("@blockfrost/blockfrost-js");
const CONSTANT = require("../scripts/constants");
const fileUpload = require('express-fileupload');
const fs = require('fs');


app.use(cors());
app.use(express.json());

// default options
app.use(fileUpload());

const Instance = new Blockfrost.BlockFrostIPFS({projectId: CONSTANT.CONSTANTS.ProjectID});
let dir = 1;

app.get("/", (req, res) => {
  (async() => {
    const pinnedList = await Instance.list();
    res.json({ AllMinted: pinnedList});    
  })();
});


app.post("/upload", (req, res) => {
  if (!req.files){
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files;
  const name = req.body.name.replace(/ /g, "_").trim();
  const description = req.body.description;
  const extension = file.imageFile.name.slice(file.imageFile.name.search(/\./g)+1).replace(/ /g, "_").trim();
  const storeDir = `${__dirname}/uploads/${name}-${dir.toString()}/`;

  (() => {
      if (!fs.existsSync(storeDir)) {
        fs.mkdirSync(storeDir, { recursive: true });  
      }
  
      file.imageFile.mv(`${storeDir}${name}.${extension}`, function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        dir++;
      });
    })();

  const getFilePath = () => {
    consolel.log("Waiting for directory creation...");
  }  

  (async () => {
      await new Promise(getFilePath => setTimeout(getFilePath, 2000));
  
      try {
        const added = await Instance.add(path.resolve(`${storeDir}${name}.${extension}`));
        res.json(added);  
      } catch (err) {
          console.log(err);
      }
    })();
});


app.get("/mint", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
