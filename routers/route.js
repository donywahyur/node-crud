const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");

const auth = require("../auth.js");

router.get("/data", auth(), controller.ambil_data);
router.get("/data/:id", auth(), controller.ambil_data_by_id);
router.post("/tambah_data", auth(), controller.tambah_data);
router.put("/edit_data", auth(), controller.edit_data);
router.delete("/hapus_data", auth(), controller.hapus_data);

router.get("/", () => {
  console.log("berhasil");
});

module.exports = router;
