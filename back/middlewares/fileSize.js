import fs, { unlink } from "fs"

function fileSize(req, res, next) {
    const maxSize = 30 * 1024 * 1024; // 30 MB


    try {
        if (req?.file?.size >= maxSize) {

            fs.unlink(req.file.path, (err) => {
                if (err) console.error(err);
            });

            return res.status(400).json({
                status: "fail",
                message: `The image is too big, 30 MB max`,
            })
        }

        next();
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: `${error}`,
        })
    }
}

export default fileSize;