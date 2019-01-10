clock = document.querySelector(".clock");
dateDisp = document.querySelector(".date");

function updateTime() {
    today = new Date()
    time = today.toLocaleTimeString();
    clock.innerHTML = time;
}
function updateDate() {
    today = new Date();
    date = today.toLocaleDateString();
    dateDisp.innerHTML = date;
}

window.onload = function() {
    updateTime();
    updateDate();
}

setInterval(updateTime, 1000);
