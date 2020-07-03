import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  uploadUsers,
} from "../controllers/userController";
const multer = require("multer");
const csv = require("fast-csv");
const upload = multer({ dest: "tmp/csv/" });
var AsyncLock = require("async-lock");
var lock = new AsyncLock();
const fs = require("fs");

const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  /*   uploadUsers(req, res); */
  lock.acquire(
    "key",
    function(done) {
      setTimeout(function() {
        uploadUsers(req, res);
        fs.unlinkSync(req.file.path);
        done();
      }, 3000);
    },
    function(err, ret) {},
    {}
  );
});
router.get("/", (req, res) => getUsers(req, res));
router.get("/:userId", (req, res) => getUser(req, res));
router.post("/:userId", (req, res) => createUser(req, res));
router.patch("/:userId", (req, res) => updateUser(req, res));
router.delete("/:userId", (req, res) => deleteUser(req, res));

export default router;
