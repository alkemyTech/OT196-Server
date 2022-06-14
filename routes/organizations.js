var express = require("express");
var router = express.Router();
const { Organization } = require("../models/index");

router.get("/1/public", async (req, res, next) => {
  await Organization.findByPk(1)
  .then((r) => {
    if (!r) return res.status(500).send({ok: false, message: 'Public data is empty.'})
    res.status(200).send(r)
  })
  .catch((e) => res.status(500).send({ok: false, message: 'Cant fetch public data.', error: e.original?.sqlMessage || e.name || "Error on fetch data."}))
  });

  module.exports = router;
