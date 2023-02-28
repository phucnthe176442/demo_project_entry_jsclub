const Submission = require('../models/Submission');
const User = require('../models/User');
const fs = require('fs');
const axios = require('axios');
const qs = require('qs');
const Testcase = require('../models/Testcase');

class SubmitController {
  // [POST] /homepage/submit

  createSubmission(req, res, next) {
    if (req.session.user) {
      let code = '#include<stdio.h> \nint main(){printf("Hello World");return 0;}';
      code = fs.readFileSync('./src/public/solutions/solution.c');
      let checkTest = new Promise(resolve=>{
        Testcase.find({ task_name: req.body.task_name }).lean()
        .then((testcases) => {
          var correct = 0;
          for (let i = 0; i < testcases.length;i++) {
            let sendData = qs.stringify({
              'code': code,
              'language': 'c',
              'input': testcases[i].input
            });
            //the config of axios to use CodeX API
            let config = {
              method: 'post',
              url: 'https://api.codex.jaagrav.in',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: sendData
            };
            //send the code and get the result

            axios(config)
              .then(async (res2) => {
                let out = await res2;
                console.log('data: ' + out.data.output);
                
                if (out.data.output === testcases[i].output)
                  correct++;
              })
              .catch(function (err) {
                console.log(err);
              });
          }
          return correct;
        })
        .catch((error) => next(error));
      });
      
      let  check = async () =>{
        let correct = await checkTest;
        res.json(correct);
      }
      check();
        // var status = 'Wrong answer';
        // if (correct == testcases.length) {

        //   status = 'Accepted';

        // }
        // var FormData = {
        //   user_name: req.session.user,
        //   task_name: req.body.task_name,
        //   status: status,
        //   slug: req.body.task_name
        // };
        // var submission = new Submission(FormData);
        // // res.json(req.body);
        // submission.save();
        

      // res.redirect("/homepage");

    }
    else {
      res.redirect("/");
    }
  }
}

module.exports = new SubmitController();
