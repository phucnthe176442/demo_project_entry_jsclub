var change_username = document.querySelector(".popup_change_username");
var show_btn_change_username = document.querySelector("#btn_change_username");
var close_btn_change_username = document.querySelector("#cancel_username");

var change_password = document.querySelector(".popup_change_password");
var show_btn_change_password = document.querySelector("#btn_change_password");
var close_btn_change_password = document.querySelector("#cancel_password");

show_btn_change_username.addEventListener("click", () => change_username.classList.add("active_change_username"));
show_btn_change_username.addEventListener("click", () => change_password.classList.remove("active_change_password"));
close_btn_change_username.addEventListener("click", () => change_username.classList.remove("active_change_username"));

show_btn_change_password.addEventListener("click", () => change_username.classList.remove("active_change_username"));
show_btn_change_password.addEventListener("click", () => change_password.classList.add("active_change_password"));
close_btn_change_password.addEventListener("click", () => change_password.classList.remove("active_change_password"));