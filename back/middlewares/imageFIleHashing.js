import fs from "fs/promises";

import sha256 from "sha256"

const imageHashing = async (req, res, next) => {
    try {
        const file = await fs.readFile(req.file.path);

        req.hashedImage = await sha256(file);

        next();
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: `${err}`,
        })
    }
}

export default imageHashing;