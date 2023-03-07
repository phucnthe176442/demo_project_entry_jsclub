const Task = require("../models/Task");
const Submission = require("../models/Submission");

class Paging {
  constructor(n, nrpp, index, totalPage, begin, end, pageStart, pageEnd) {
    this.n = n;
    this.nrpp = n > 10 ? 10 : n;
    this.totalPage = Math.floor((n + this.nrpp - 1) / this.nrpp);
  }
  calculatePage(req) {
    this.index = 0;
    if (req.body.index) this.index = req.body.index;
    let totalPage = req.body.totalPage;
    if (req.body.btnHome)
      //click home
      this.index = 0;
    if (req.body.btnEnd)
      //click end
      this.index = totalPage - 1;
    if (req.body.btnPre)
      //click pre
      this.index--;
    if (req.body.btnNext)
      //click next
      this.index++;
    if (req.body.btnIndex)
      // click button i
      this.index = req.body.btnIndex - 1;
    this.begin = this.index * this.nrpp;
    this.end =
      this.begin + this.nrpp - 1 > this.n
        ? this.n - 1
        : this.begin + this.nrpp - 1; //ket thuc tai end
    this.pageStart = this.index - 2 < 0 ? 0 : this.index - 2;
    this.pageEnd =
      this.index + 2 > this.totalPage - 1 ? this.totalPage - 1 : this.index + 2;
  }
  calculatePageTask(req) {
    this.index = 0;
    if (req.body.indexTask) this.index = req.body.indexTask;
    let totalPage = req.body.totalPageTask;
    if (req.body.btnHomeTask)
      //click home
      this.index = 0;
    if (req.body.btnEndTask)
      //click end
      this.index = totalPage - 1;
    if (req.body.btnPreTask)
      //click pre
      this.index--;
    if (req.body.btnNextTask)
      //click next
      this.index++;
    if (req.body.btnIndexTask)
      // click button i
      this.index = req.body.btnIndexTask - 1;
    this.begin = this.index * this.nrpp;
    this.end =
      this.begin + this.nrpp - 1 > this.n
        ? this.n - 1
        : this.begin + this.nrpp - 1; //ket thuc tai end
    this.pageStart = this.index - 2 < 0 ? 0 : this.index - 2;
    this.pageEnd =
      this.index + 2 > this.totalPage - 1 ? this.totalPage - 1 : this.index + 2;
  }
}
function getSubmissions(req) {
  if (req.session.admin)
    return Submission.find({})
      .sort({ createAt: "desc" })
      .lean()
      .then((submissions) => {
        return submissions;
      });
  else
    return Submission.find({ user_name: req.session.user })
      .sort({ createAt: "desc" })
      .lean()
      .then((submissions) => {
        return submissions;
      });
}
class SiteController {
  // [GET] /
  index(req, res, next) {
    if (req.session.user) {
      Task.find({})
        .lean()
        .then(async (tasks) => {
          let submissions = await getSubmissions(req);

          let page = new Paging(submissions.length);

          page.calculatePage(req);

          let pageTask = new Paging(tasks.length);

          pageTask.calculatePageTask(req);

          res.render("home", {
            username: req.session.user,
            tasks,
            submissions,
            page,
            subHome: page.index != 0,
            subEnd: page.index != page.totalPage - 1,
            pageTask,
            taskHome: pageTask.index != 0,
            taskEnd: pageTask.index != pageTask.totalPage - 1,
            isAdmin: req.session.admin,
          });
        })
        .catch((error) => next(error));
    } else {
      res.redirect("/");
    }
  }
}

module.exports = new SiteController();
