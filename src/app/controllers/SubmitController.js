const Submission = require("../models/Submission");
const User = require("../models/User");
const Testcase = require("../models/Testcase");

const child = require('child_process');

function compile() {
  // compile the C code using GCC
  const fileName = "solution.c";
  const compileCommand ='gcc -o ' + __dirname + '\\solution';
    //  + __dirname + `\\${fileName}`;
  child.execSync(compileCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`compiled successfully`);
  });
}
async function execute(testcase) {
    const cmd = './'+__dirname + "\\solution";
    const child = exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
    });
    child.stdin.write(testcase.input);
    console.log(`stdout: `+child.stdout);
    if(child.stderr)
      console.error(`stderr: ` +child.err);
    child.stdin.end();
    return child.stdout;
  }

async function checkTest(testcases) {
  let correct = 0;
  for (let i = 0; i < testcases.length; ++i) {
    const output = await execute(testcases[i]);
    if (output === testcases[i].output) correct++;
  }
  return correct;
}

async function run(testcases) {
  return compile().then(checkTest(testcases));
}

class SubmitController {
  // [POST] /homepage/submit
  createSubmission(req, res, next) {
    if (req.session.user) {
      Testcase.find({ task_name: req.body.task_name })
        .lean()
        .then((testcases) => {
          compile();
        })
        .catch((error) => next(error));
        res.redirect("/homepage");
    } else {
      res.redirect("/");
    }
  }
}

module.exports = new SubmitController();
