const { CustomAPIError } = require('../errors/custom-api-error')

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.json({ msg: err.message })
    }
    return res.json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware