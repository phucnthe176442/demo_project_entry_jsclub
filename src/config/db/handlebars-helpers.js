module.exports = {
    displayPageSubmission: function (pageStart, pageEnd, index) {
        let list = "";
        for (let i = pageStart; i < pageEnd+1; i++) {
            if(i == index){
                list += "<input class='page_now'  type='submit' name='btnIndex' value='" + (i + 1) + "'></input>";
            }else{
                list += "<input type='submit' name='btnIndex' value='" + (i + 1) + "'></input>";
            }
        }
        return list;
    },
    submissionsTable: function (submissions, begin, end, isAdmin) {
        let list = "";
        if (isAdmin)
            for (let i = begin; i < end + 1; i++)
                list += "<tr class='submission_item'><th scope='row'>" + (i + 1) + "</th><td>" + submissions[i].createAt + "</td><td>" + submissions[i].user_name + "</td><td> <a href='/homepage/tasks/" + submissions[i].slug + "'>" + submissions[i].task_name + "</a></td><td>" + submissions[i].status + "</td><td><a href='./solutions/"+submissions[i].code+".c'><i class='fa-solid fa-eye'></i></a></td></tr>";
        else
            for (let i = begin; i < end + 1; i++)
                list += "<tr class='submission_item'><th scope='row'>" + (i + 1) + "</th><td>" + submissions[i].createAt + "</td><td> <a href='/homepage/tasks/" + submissions[i].slug + "'>" + submissions[i].task_name + "</a></td><td>" + submissions[i].status + "</td><td><a href='./solutions/"+submissions[i].code+".c'><i class='fa-solid fa-eye'></i></a></td></tr>";
        return list;
    },
    displayPageTask: function (pageStart, pageEnd,index) {
        let list = "";
        for (let i = pageStart; i < pageEnd+1; i++) {
            if(i == index){
                list += "<input class='page_now' type='submit' name='btnIndexTask' value='" + (i + 1) + "'></input>";
            }else{
                list += "<input type='submit' name='btnIndexTask' value='" + (i + 1) + "'></input>";
            }
        }
        return list;
    },
    tasksTable: function (tasks, begin, end, isAdmin) {
        let list = "";
        if (isAdmin)
            for (let i = begin; i < end + 1; i++) {
                list += "<tr class='problem_item'><th scope='row'>" + (i + 1) + "</th><td> <a href='/homepage/tasks/" + tasks[i].slug + "'>" + tasks[i].task_name + "</a></td><td>" + tasks[i].score + "</td>";
                list += "<td class='problem_info'><a href='/homepage/tests/" + tasks[i].slug + "/showCreate'><button><i class='fa-regular fa-plus'></i></button></a></td>";
                list += "<td class='problem_info'><form method='POST' action='/homepage/tasks/delete'><input type='hidden' name='slug' value=" + tasks[i].slug + "><button onclick='checkDelete()' type='submit'><i class='fa-solid fa-circle-minus'></i></button></form></td></tr>"
            }
        else
            for (let i = begin; i < end + 1; i++) {
                list += "<tr><th scope='row'>" + (i + 1) + "</th><td> <a href='/homepage/tasks/" + tasks[i].slug + "'>" + tasks[i].task_name + "</a></td><td>" + tasks[i].score + "</td></tr>";
            }
        return list;
    },
}