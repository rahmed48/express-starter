var express = require("express");
var router = express.Router();
const viewController = require("../controllers/viewController");

router.get(`/`, viewController.index);

module.exports = router;
