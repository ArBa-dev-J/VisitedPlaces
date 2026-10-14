import fs, { unlink } from "fs";

function fileSize(req, res, next) {
  const maxSize = 30 * 1024 * 1024; // 30 MB
  const objLength = req.files.length;

  try {
    for (let i = 0; i < objLength; i++) {
      if (req.files[i].size >= maxSize) {
      fs.unlink(req.files[i].path, (err) => {
          if (err) console.error(err);

          return res.status(400).json({
            status: "fail",
            message: `One or multiple images are too big, one image size cannot be higher than 30 MB`,
          });
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: `${error}`,
    });
  }
}

export default fileSize;
