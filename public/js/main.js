var time, counter;
var intervalHandle;
var runTime = 0;
var startedTime, finishedTime;
const radius = 100;
const circleLength = 2 * Math.PI * radius;
var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
var out_h = document.getElementById("out-h");
var out_m = document.getElementById("out-m");
var out_s = document.getElementById("out-s");
var hour = document.getElementById("hour");
var minute = document.getElementById("minute");
var second = document.getElementById("second");
var circle = document.querySelector('.progress-ring-circle');
circle.style.strokeDasharray = `${circleLength} ${circleLength}`;
circle.style.strokeDashoffset = circleLength;


function tick() {
    if (runTime === 0) {
        counter = sessionStorage.getItem('counter');
        // console.log(sessionStorage.getItem('counter'));

        drawTime(counter);
        setProgress((time - counter) / time * 100);
        if (counter == 0) {

            finishedTime = new Date();
            // clearInterval(intervalHandle);
            sendDate();
            setTimeout(resetTime, 1000);
            // ready();
            setTimeout(ready, 1000);
            // resetTime();
        }
        counter--;

        sessionStorage.setItem('counter', counter);
    } else {
        runTime = 0;
        sessionStorage.setItem('runtime', runTime)
        intervalHandle = setInterval(tick, 1000);
    }
}

function startTime() {
    if (runTime == 0) {
        console.log('hi');
        time = counter = hour.value * 3600 + minute.value * 60 + second.value * 1;
        sessionStorage.setItem('counter', counter);
        sessionStorage.setItem('time', time);
        if (time === 0 && counter == 0) {
            errorMessage();
            return 0;
        }
        startedTime = new Date();
        sessionStorage.setItem('startedTime', startedTime);
        tick();
        intervalHandle = setInterval(tick, 1000);
    } else {
        tick();
    }
    enableStopButton();
    disableStartButton();
}

function stopTime() {
    disableStopButton();
    enableStartButton();
    clearInterval(intervalHandle);
    runTime = 1;
    sessionStorage.setItem('runtime', runTime);

}

function resetTime() {

    out_h.innerHTML = "00";
    out_m.innerHTML = "00";
    out_s.innerHTML = "00";
    hour.value = 0;
    minute.value = 0;
    second.value = 0;
    runTime = 0;
    sessionStorage.setItem('runtime', runTime);
    clearInterval(intervalHandle);

    ready();
    enableStartButton();
    disableStopButton();
    sessionStorage.setItem('runtime', 0);
    sessionStorage.setItem('counter', 0);
    sessionStorage.setItem('offset', circleLength);

}

function drawTime(counter) {
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
}

function setProgress(persent) {
    const offset = circleLength - persent / 100 * circleLength;
    circle.style.strokeDashoffset = offset;
    sessionStorage.setItem('offset', offset);
}

function sendDate() {
    var request = new XMLHttpRequest();
    startedTime = new Date(sessionStorage.getItem('startedTime'));

    var body = "started=" + encodeURIComponent(startedTime.toLocaleTimeString()) + "&finished=" + encodeURIComponent(finishedTime.toLocaleTimeString()) + "&value=" + encodeURIComponent(convertToDate(time));

    request.open("POST", "/post", true);
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
    circle.style.strokeDasharray = `${circleLength} ${circleLength}`;
    circle.style.strokeDashoffset = circleLength;
};

function disableStartButton() {
    document.getElementById('start').disabled = true;
}

function enableStartButton() {
    document.getElementById('start').disabled = false;
}

function disableStopButton() {
    document.getElementById('stop').disabled = true;
}

function enableStopButton() {
    document.getElementById('stop').disabled = false;
}

function errorMessage() {
    document.getElementById('error').className = "error-msg";
    setTimeout(function() {
        document.getElementById('error').className = "displey-none";
    }, 2000);
}

function isReload() {
    if (window.performance.getEntriesByType("navigation")[0].type == 'reload') {
        if (sessionStorage.getItem('runtime') == 0 && sessionStorage.getItem('counter') != 0) {
            enableStopButton();
            disableStartButton();
            counter = sessionStorage.getItem('counter');
            circle.style.strokeDashoffset = sessionStorage.getItem('offset');
            time = sessionStorage.getItem('time');


            intervalHandle = setInterval(tick, 1000);

        } else if (sessionStorage.getItem('runtime') == 1) {
            disableStopButton();
            enableStartButton();
            time = sessionStorage.getItem('time');
            runTime = sessionStorage.getItem('runTime');
            circle.style.strokeDashoffset = sessionStorage.getItem('offset');
            counter = sessionStorage.getItem('counter');
            counter++;
            drawTime(counter);
        }

    }

}