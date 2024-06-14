const Company = require("../models/companyModel");

exports.addOneCompany = async function (data) {
    return await Company.create({ ...data, status: "pending" });
};

exports.getOneCompanyByEmail = async function (email) {
    return await Company.findOne({ email });
};

exports.getOneCompanyByID = async function (id) {
    return await Company.findById(id);
};

exports.verifyOneCompanyById = async function (id) {
    return await Company.findByIdAndUpdate(
        id,
        { $set: { status: "approved" } },
        { new: true }
    );
};

exports.getAllCompanies = async function (query) {
    return await Company.find(query);
};

exports.updateOneCompany = async function (id, data) {
    return await Company.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteOneCompany = async function (id) {
    return await Company.findByIdAndDelete(id);
};
