var time, counter;
var intervalHandle;
var runTime = 0;
var startedTime, finishedTime;
const radius = 100;
const circleLength = 2 * Math.PI * radius;




function tick() {
    if (runTime === 0) {
        counter--;
        var out_h = document.getElementById("out-h");
        var out_m = document.getElementById("out-m");
        var out_s = document.getElementById("out-s");

        var h = Math.floor(counter / 3600);
        var m = Math.floor((counter - h * 3600) / 60);
        var s = counter - h * 3600 - m * 60;

        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }

        out_h.innerHTML = h.toString();
        out_m.innerHTML = m.toString();
        out_s.innerHTML = s.toString();
        setProgress((time - counter) / time * 100);
        if (counter === 0) {
            finishedTime = new Date();
            clearInterval(intervalHandle);
            sendDate();
            // ready();
            setTimeout(ready, 1000);
        }

    } else {
        runTime = 0;
        intervalHandle = setInterval(tick, 1000);
    }
}

function startTime() {
    if (runTime === 0) {
        var hour = document.getElementById("hour").value;
        var minute = document.getElementById("minute").value;
        var second = document.getElementById("second").value;
        time = counter = hour * 3600 + minute * 60 + second * 1;
        if (time === 0) return 0;
        startedTime = new Date();
        intervalHandle = setInterval(tick, 1000);



    } else {
        tick();
    }
}

function stopTime() {
    clearInterval(intervalHandle);
    runTime = 1;
}

function resetTime() {
    document.getElementById("out-h").innerHTML = "00";
    document.getElementById("out-m").innerHTML = "00";
    document.getElementById("out-s").innerHTML = "00";
    document.getElementById("hour").value = 0;
    document.getElementById("minute").value = 0;
    document.getElementById("second").value = 0;
    runTime = 0;
    clearInterval(intervalHandle);
    document.querySelector('.progress-ring-circle').style.strokeDasharray = `${circleLength} ${circleLength}`;
    document.querySelector('.progress-ring-circle').style.strokeDashoffset = circleLength;
}

function setProgress(persent) {
    const offset = circleLength - persent / 100 * circleLength;
    document.querySelector('.progress-ring-circle').style.strokeDashoffset = offset;
}

function sendDate() {
    var request = new XMLHttpRequest();
    var token = document.querySelector('meta[name="csrf-token"]').content;

    var body = "started=" + encodeURIComponent(startedTime.toLocaleTimeString()) + "&finished=" + encodeURIComponent(finishedTime.toLocaleTimeString()) + "&value=" + encodeURIComponent(convertToDate(time));

    request.open("POST", "/", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("x-csrf-token", token);
    request.send(body);
}

function convertToDate(time) {
    var h = Math.floor(time / 3600);
    var m = Math.floor((time - h * 3600) / 60);
    var s = time - h * 3600 - m * 60;
    return h.toString() + ":" + m.toString() + ":" + s.toString();
}

function ready() {
    document.querySelector('.progress-ring-circle').style.strokeDasharray = `${circleLength} ${circleLength}`;
    document.querySelector('.progress-ring-circle').style.strokeDashoffset = circleLength;

};