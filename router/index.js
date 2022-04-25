const express = require("express");
const { Homepage, TaskPost, TaskDelete,TaskPut, Updatepage } = require("../controller");
const router = express.Router();

router.route("/").get(Homepage).post(TaskPost).delete(TaskDelete).put(TaskPut);
router.get("/:id", Updatepage);

module.exports = router;
