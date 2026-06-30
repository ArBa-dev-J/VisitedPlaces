import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname).toLocaleLowerCase();
        cb(null, uniqueName);
    }
});

// check file type

const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png']
    const allowedExts = /jpg|png|/

    const mimetype = allowedMimes.includes(file.mimetype);
    const extname = allowedExts.test(path.extname(file.originalname).toLocaleLowerCase());

    if (mimetype && extname) {
        return cb(null, true)
    }

    return cb(new Error(`Invalid file type. Only ${allowedMimes.join(', ')} are allowed`))

}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


export default upload; 