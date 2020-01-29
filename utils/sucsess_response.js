const successResponse = (res, statusCode, message, data) => {
    res.status(statusCode)
        .send(
            {
                statusCode,
                message,
                data
            }
        )
}
module.exports = successResponse;

