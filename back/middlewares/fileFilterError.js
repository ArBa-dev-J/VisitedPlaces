const fileFilterError = (err, req, res, next) => {
    if (err) {
        return res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }

    next();
}

export default fileFilterError