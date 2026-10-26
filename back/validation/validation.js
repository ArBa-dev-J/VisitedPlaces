import { validationResult } from "express-validator";
import fs, { unlink } from "fs";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        fs.unlink(req.files[i].path, (err) => {
          if (err) console.error(err);
        });
      }
    }

    return res.status(400).json({
      status: "fail",
      error: errors.array(),
    });
  }
  next();
};

export default validate;
