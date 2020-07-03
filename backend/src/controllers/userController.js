import { User } from "../db/models";
const Sequelize = require("sequelize");
const multer = require("multer");
const csv = require("fast-csv");
const upload = multer({ dest: "tmp/csv/" });
const fs = require("fs");
const { EOL } = require("os");

export const getUsers = async (req, res) => {
  var limit = 30;
  var minSalary = 0;
  var maxSalary = 4000;
  var offset = 0;
  var sortCriteria = "";
  var sortOrder = "ASC";
  var sortRegex = /^(\+|\s|\-)(id|name|login|salary)$/;

  if (typeof req.query.limit !== "undefined") {
    limit = req.query.limit;
  }

  if (typeof req.query.minsalary !== "undefined") {
    minSalary = req.query.minsalary;
  }

  if (typeof req.query.maxsalary !== "undefined") {
    maxSalary = req.query.maxsalary;
  }

  if (typeof req.query.offset !== "undefined") {
    offset = req.query.offset;
  }

  if (typeof req.query.sort !== "undefined") {
    if (sortRegex.test(req.query.sort)) {
      var sortMatch = req.query.sort.match(sortRegex);
      if (sortMatch[1] === " " || sortMatch[1] === "+") {
        sortOrder = "ASC";
      } else if (sortMatch[1] === "-") {
        sortOrder = "DESC";
      }
      sortCriteria = "user_" + sortMatch[2];
    }
  }

  const { count, rows: users } = User.findAndCountAll({
    attributes: [
      ["user_id", "id"],
      ["user_login", "login"],
      ["user_name", "name"],
      ["user_salary", "salary"],
    ],
    offset: offset,
    limit: limit,
    order: [[sortCriteria, sortOrder]],
    where: { user_salary: { [Sequelize.Op.between]: [minSalary, maxSalary] } },
  }).then((users) => {
    if (!users) {
      return res.sendStatus(404);
    }
    return res.json({ count, users: users });
  });
};

export const getUser = async (req, res) => {
  const user = User.findOne({
    where: {
      user_id: req.params.userId,
    },
  }).then((user) => {
    if (!user) {
      return res.sendStatus(404);
    }
    return res.json({ user: user });
  });
};

export const createUser = async (req, res) => {
  await User.findOne({ where: { user_id: req.params.userId } }).then(
    async (record) => {
      if (!record) {
        const newUser = await User.create({
          user_id: req.params.userId,
          user_login: req.body.login,
          user_name: req.body.name,
          user_salary: req.body.salary,
        }).catch(function(err) {
          return res.status(400).send(err.errors[0].message);
        });
        res.send(newUser);
      } else {
        res.status(400).send("User already exists.");
      }
    }
  );
};

export const uploadUsers = async (req, res) => {
  const fileRows = [];
  var dataValid = true;
  const stream = csv
    .parseFile(req.file.path, {
      ignoreEmpty: false,
      headers: ["user_id", "user_login", "user_name", "user_salary"],
      renameHeaders: true,
      comment: "#",
      strictColumnHandling: true,
    })
    .on("error", (error) => {
      dataValid = false;
    })
    .validate((data) => {
      return parseFloat(data.user_salary) >= 0.0;
    })
    .on("data-invalid", (row, rowNumber) => {
      dataValid = false;
    })
    .on("data", function(data) {
      fileRows.push(data);
    })
    .on("end", function() {
      if (dataValid && fileRows.length > 0) {
        User.bulkCreate(fileRows)
          .then(function() {
            return res.status(200).send("Upload successful.");
          })
          .catch(function(err) {
            return res.status(400).send(err.errors[0].message);
          });
      } else if (!dataValid) {
        return res.status(400).send("The csv file is invalid!");
      } else {
        return res.status(400).send("The csv file is empty!");
      }
    });
};

export const updateUser = async (req, res) => {
  const newUserInfo = await User.findOne({
    where: { user_id: req.params.userId },
  }).then(async (record) => {
    if (!record) {
      return res.status(400).send("No user found.");
    }
    var values = {
      user_login: record.user_login,
      user_name: record.user_name,
      user_salary: record.user_salary,
    };
    if (req.body.name !== "undefined") {
      values.user_login = req.body.login;
    }
    if (req.body.name !== "undefined") {
      values.user_name = req.body.name;
    }
    if (req.body.name !== "undefined") {
      values.user_salary = parseFloat(req.body.salary);
    }
    await record
      .update(values)
      .then((updatedRecord) => {
        res.status(200).send("Update successful.");
      })
      .catch(function(err) {
        return res.status(400).send(err);
      });
  });
};

export const deleteUser = async (req, res) => {
  const newUserInfo = await User.findOne({
    where: { user_id: req.params.userId },
  }).then(async (record) => {
    if (!record) {
      return res.status(400).send("No user found.");
    }
    const deleteSuccess = await User.destroy({
      where: { user_id: req.params.userId },
    }).catch(function(err) {
      return res.status(400).send(err.errors[0].message);
    });
    if (deleteSuccess) {
      res.status(200).send("Delete success!");
    }
  });
};
