const MainErrorHandler = require('../utils/MainErrorHandler');
const JoiErrorHandler = require('../utils/JoiErrorHandler');

module.exports = function (error, req, res, next) {

	switch (error.constructor) {

		case MainErrorHandler: {
			const { statusCode, message } = error;

			return res.status(statusCode).json({
				statusCode,
				errors: [
					message
				]
			}).end();
		}

		case JoiErrorHandler: {
			const { statusCode, joiError } = error;
			const messages = joiError.details.map(i => {
				let e = {};
				e[i.context.key] = i.message.replace(/\"/g, '');
				return e;
			})

			return res.status(statusCode).json({
				statusCode,
				errors: messages
			}).end();
		}

		default: {
			return res.status(500).json({
				"statusCode": 500,
				"errors": [
					{
						"message": error.message
					}
				]
			  }).end();
		}

	}
};