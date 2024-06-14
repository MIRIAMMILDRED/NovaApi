const joi = require("joi");

exports.createCompanySchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    industry: joi.string().required(),
    size: joi.string().required(),
});

exports.createCompanyAdminSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    industry: joi.string().required(),
    size: joi.string().required(),
    adminFirstName: joi.string().required(),
    adminLastName: joi.string().required(),
    adminEmail: joi.string().required(),
    adminPassword: joi.string().required(),
});
exports.updateCompanySchema = joi.object({
    body: joi.object({
        name: joi.string().optional(),
        email: joi.string().email().optional(),
        industry: joi.string().optional(),
        size: joi.string().optional(),
    }),
    params: joi.object({
        id: joi.string().required("A company id is required"),
    }),
});
