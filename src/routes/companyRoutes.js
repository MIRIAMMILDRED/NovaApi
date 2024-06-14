const express = require("express");
const {
    validateResource,
    validateWithParams,
    validateWithQuery,
} = require("../middlewares/validateResource");
const companyController = require("../controllers/companyController");
const {
    createCompanySchema,
    updateCompanySchema,
    createCompanyAdminSchema,
} = require("../schemas/companySchema");

const router = express.Router();

router
    .route("/companies")
    .post(
        validateResource(createCompanyAdminSchema),
        companyController.addOneCompanyAdmin
    )
    .get(companyController.getAllCompanies);

router
    .route("/companies/:id")
    .get(companyController.getOneCompanyById)
    .patch(
        validateWithParams(updateCompanySchema),
        companyController.updateOneCompany
    );

router
    .route("/companies/:id/verify")
    .patch(companyController.verifyOneCompanyById);

module.exports = router;
