const companyService = require("../services/companyService");
const userService = require("../services/userService");
const authUtils = require("../utils/authUtils");

exports.addOneCompanyAdmin = async function (req, res, next) {
    try {
        const { name, email, industry, size } = req.body;
        const company = await companyService.addOneCompany({
            name,
            email,
            industry,
            size,
        });

        const hashedPassword = await authUtils.hashPassword(
            req.body.adminPassword
        );
        const admin = await userService.addOneUser({
            firstName: req.body.adminFirstName,
            lastName: req.body.adminLastName,
            email: req.body.adminEmail,
            password: hashedPassword,
            role: "CompanyAdmin",
            isVerified: false,
            companyId: company._id,
        });
        return res
            .status(201)
            .json({
                message: "Company admin registered successfully",
                data: company,
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", error });
        // next(error)
    }
};

exports.getOneCompanyById = async function (req, res, next) {
    try {
        const company = await companyService.getOneCompanyByID(req.params.id);
        return res.status(201).json({ data: company });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

exports.verifyOneCompanyById = async function (req, res, next) {
    try {
        const company = await companyService.verifyOneCompanyById(
            req.params.id
        );
        return res
            .status(201)
            .json({
                message: "Company status verified successfully",
                data: company,
            });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

exports.getAllCompanies = async function (req, res, next) {
    try {
        const companies = await companyService.getAllCompanies({});
        return res.status(201).json({ data: companies });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

exports.updateOneCompany = async function (req, res, next) {
    try {
        const company = await companyService.updateOneCompany(
            req.params.id,
            req.body
        );
        return res.status(201).json({ data: company });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};
