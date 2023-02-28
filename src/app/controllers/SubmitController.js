const Submission = require("../models/Submission");
const User = require("../models/User");
const Testcase = require("../models/Testcase");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fs = require("fs");
const axios = require("axios");
const qs = require("qs");

const { exec } = require("child_process");

const send = (testcase) =>
  new Promise((resolve) => {
    //const input = testcases[i].input; // input value to be passed to the C program
    const cmd = __dirname + "\\solution";

    const child = exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });

    child.stdin.write(testcase.input);
    child.stdin.end();
    setTimeout(() => resolve(child.stdout), 5000);
  });

async function firstAsyncFunction() {
  // compile the C code using GCC
  const fileName = "solution.c";
  const compileCommand =
    `gcc -o ` + __dirname + `\\solution ` + __dirname + `\\${fileName}`;
  exec(compileCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

async function secondAsyncFunction(testcases) {
  let correct = 0;
  for (let i = 0; i < testcases.length; ++i) {
    const output = await send(testcases[i]);
    if (output === testcases[i].output) correct++;
  }
  return correct;
}

async function executeFunctions(testcases) {
  return firstAsyncFunction().then(() => secondAsyncFunction(testcases));
}

class SubmitController {
  // [POST] /homepage/submit
  createSubmission(req, res, next) {
    if (req.session.user) {
      Testcase.find({ task_name: req.body.task_name })
        .lean()
        .then((testcases) => {
          let cnt = executeFunctions(testcases);
          res.json(cnt);
        })
        .catch((error) => next(error));
    } else {
      res.redirect("/");
    }
  }
}

module.exports = new SubmitController();
