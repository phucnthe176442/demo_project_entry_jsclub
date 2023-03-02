const Submission = require("../models/Submission");
const Testcase = require("../models/Testcase");
const fs = require("fs");
const axios = require("axios");
const qs = require("qs");


async function compile(code, testcase) {
  let sendData = qs.stringify({
    code: code,
    language: "c",
    input: testcase.input,
  });
  //the config of axios to use CodeX API
  let config = {
    method: "post",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: sendData,
  };
  //send the code and get the result

  let output = await axios(config)
    .then((res) => {
      // console.log('data: ' + res.data.error);
      return res.data;
    })
    .catch(function (err) {
      console.log('err' + err);
    });
  return output;
}

async function checkTest(code, testcases, req) {
  let correct = 0;
  let i = 0;
  for (let testcase of testcases) {
    correct = await compile(code, testcase).then((res) => {
      console.log("test number " + i + " succeed with output: " + res);
      if (res === testcase.output) correct++;
      else return -1;
      i++;
      return correct;
    });
    if (correct == -1) break;
  }

  var status = "Wrong answer";
  if (correct == testcases.length) status = "Accepted";
  var FormData = {
    user_name: req.session.user,
    task_name: req.body.task_name,
    status: status,
    slug: req.body.task_slug,
  };
  console.log(FormData);
  var submission = new Submission(FormData);
  submission.save();
}

class SubmitController {
  // [POST] /homepage/submit
  createSubmission(req, res, next) {
    if (req.session.user) {
      let code =
        '#include<stdio.h> \nint main(){printf("Hello World");return 0;}';
      code = fs.readFileSync("./src/public/solutions/solution.c");

      Testcase.find({ task_name: req.body.task_name })
        .lean()
        .then(async (testcases) => {
          await checkTest(code, testcases, req);
          res.redirect("/homepage");
        })
        .catch((error) => next(error));
    } else {
      res.redirect("/");
    }
  }
}

module.exports = new SubmitController();