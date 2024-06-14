function validateResource(schema) {
    return async function (req, res, next) {
        const { error, value } = schema.validate(req.body, {
            presence: "required",
        });

        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }

        next();
    };
}

function validateWithParams(schema) {
    return async function (req, res, next) {
        const { error, value } = schema.validate(
            { body: req.body, params: req.params },
            {
                presence: "required",
            }
        );

        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }

        next();
    };
}

function validateWithQuery(schema) {
    return async function (req, res, next) {
        const { error, value } = schema.validate(req.query, {
            presence: "required",
        });

        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }

        next();
    };
}

module.exports = { validateResource, validateWithQuery, validateWithParams };
