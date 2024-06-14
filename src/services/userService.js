const User = require("../models/userModel");

exports.addOneUser = async function (data) {
    return await User.create(data);
};

exports.getOneUserByEmail = async function (email) {
    return await User.findOne({ email });
};

exports.getOneUserByID = async function (id) {
    return await User.findById(id);
};

exports.getAllUsers = async function (query) {
    return await User.find(query);
};

exports.updateOneUser = async function (id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteOneUser = async function (id) {
    return await User.findByIdAndDelete(id);
};
