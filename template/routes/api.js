var express = require("express");
var router = express.Router();
const apiController = require("../controllers/apiController");

router.get(`/`, apiController.index);

module.exports = router;
