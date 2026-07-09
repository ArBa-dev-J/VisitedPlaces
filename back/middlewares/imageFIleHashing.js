import fs from "fs/promises";

import sha256 from "sha256";

const imageHashing = async (req, res, next) => {
  try {
    let file;
    if (req?.file?.path) {
      file = await fs.readFile(req?.file?.path);
    }

    file ? req.hashedImage = await sha256(file) : null;

    next();
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: `${err}`,
    });
  }
};

export default imageHashing;
