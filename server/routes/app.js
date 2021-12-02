const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "dist/study-journal/index.html"));
});

module.exports = router;
