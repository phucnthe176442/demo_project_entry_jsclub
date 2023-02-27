const Submission = require('../models/Submission');
const User = require('../models/User');
const fs = require('fs');
const axios = require('axios');
const qs = require('qs');
class SubmitController {
  // [POST] /homepage/submit

  createSubmission(req, res, next) {
    if (req.session.user) {
      let code = '#include<stdio.h> \nint main(){printf("Hello World");return 0;}';    
      code = fs.readFileSync('./src/public/solutions/solution.c');
      let sendData = qs.stringify({
        'code': code,
        'language': 'c',
        'input': '20'
    });
    //the config of axios to use CodeX API
    let config = {
        method: 'post',
        url: 'https://api.codex.jaagrav.in',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : sendData
    };
    //send the code and get the result
    
    axios(config)
    .then(function (res2) {
        console.log(res2.data.output);
    })
    .catch(function (err) {
        console.log("error code");
    }); 
    } else {
      res.redirect("/");
    }
  }
}

module.exports = new SubmitController();
