const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.hashPassword = async function (password) {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Error hashing password");
    }
};

exports.validatePassword = async function (password, hashedPassword) {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error validating password:", error);
        throw new Error("Error validating password");
    }
};

exports.createAccessToken = async function (payload) {
    try {
        return await jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
        });
    } catch (error) {
        console.error("Error creating access token:", error);
        throw new Error("Error creating access token");
    }
};

exports.decodeAccessToken = async function (token) {
    try {
        return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("Error decoding access token:", error);
        throw new Error("Error decoding access token");
    }
};
