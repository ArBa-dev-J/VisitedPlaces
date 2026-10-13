import fs from "fs/promises";

import sha256 from "sha256";

const imageHashing = async (req, res, next) => {
  try {
    let files = new Array();
    let fileNames = new Array();
    const objLength = req?.files?.length;

    if (objLength > 0) {
      // read each file obj seperatly
      for (let i = 0; i < objLength; i++) {
        files.push(await fs.readFile(req.files[i].path));
        fileNames.push(req.files[i].path);
      }
    }

    // hash and send images data arrays
    files ? (req.hashedImage = files.map((file) => sha256(file))) : null;
    fileNames ? (req.filename = fileNames) : null;

    next();
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: `${err}`,
    });
  }
};

export default imageHashing;
