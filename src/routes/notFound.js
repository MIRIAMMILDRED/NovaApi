const express = require("express");

const router = express.Router();

router.all("*", async (req, res) => {
    return res
        .status(404)
        .json({ message: "The requested resource does not exist" });
});

module.exports = router;
