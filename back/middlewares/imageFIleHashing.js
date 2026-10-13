import fs from "fs/promises";

import sha256 from "sha256";

const imageHashing = async (req, res, next) => {
  try {
    let files; 
    let fileName;
    const objLength = req?.files?.length;
    if (objLength > 0) {
    for(let i = 0; i < objLength; i++){
     files = await fs.readFile(req.files[i].path)
     fileName = req.files[i].path;
    }
    }

    files ? req.hashedImage = sha256(files) : null;
    fileName ? req.filename = fileName : null;


    next();
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: `${err}`,
    });
  }
};

export default imageHashing;
