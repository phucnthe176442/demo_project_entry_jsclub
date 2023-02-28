const Submission = require("../models/Submission");
const User = require("../models/User");
const Testcase = require("../models/Testcase");

const cp = require('child_process');
const {execSync} = require('child_process');

function compile() {
  // compile the C code using GCC
  // const fileName = "solution.c";
  const command = 'gcc -o ' +__dirname+'\\solution '+__dirname+'\\solution.c';
  const exec_options = {
    cwd: __dirname,
    timeout: 1000,
    killSignal: "SIGTERM",
    stdio: 'inherit',
    shell: true
  };
  cp.execSync(command, [], exec_options);
  console.log('compiled successfully');
}
function execute(testcase) {
  let command = __dirname + '\\solution';
  const exec_options = {
    input: testcase.input,
    cwd: __dirname,
    timeout: 3000,
    killSignal: "SIGTERM",
    stdio: 'inherit',
    shell: true
  };
  let output = cp.spawnSync(command, exec_options);
  console.log(output);
  return output;

  // const cmd = __dirname + "\\solution";

  //   const child = execSync(cmd, (err, stdout, stderr) => {
  //     if (err) {
  //       console.error(`exec error: ${err}`);
  //       return;
  //     }
  //     console.log(`stdout: ${stdout}`);
  //     console.error(`stderr: ${stderr}`);
  //   });

  //   child.stdin.write(testcase.input);
  //   child.stdin.end();
}

function checkTest(testcases) {
  let correct = 0;
  for (let i = 0; i < testcases.length; ++i) {
    const output = execute(testcases[i]);
    if (output === testcases[i].output) correct++;
  }
  return correct;
}

function run(testcases) {
  compile();
  return checkTest(testcases);
}

class SubmitController {
  // [POST] /homepage/submit
  createSubmission(req, res, next) {
    if (req.session.user) {
      Testcase.find({ task_name: req.body.task_name })
        .lean()
        .then((testcases) => {
          let correct = run(testcases);
          res.json(correct);
        })
        .catch((error) => next(error));
      // res.redirect("/homepage");
    } else {
      res.redirect("/");
    }
  }
}

module.exports = new SubmitController();
