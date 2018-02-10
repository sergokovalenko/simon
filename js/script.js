var counter, curArr, gameArr, isStrict, isActive, sounds, buttons, curBtn, startBtn;

window.onload = function () {
    isStrict = false;
    isActive = false;
    curBtn = 0;
    curArr = [];
    gameArr = [];
    sounds = [];
    buttons = [];
    buttons.push(document.getElementById("left-top"));
    buttons.push(document.getElementById("right-top"));
    buttons.push(document.getElementById("left-bottom"));
    buttons.push(document.getElementById("right-bottom"));
    counter = document.getElementById("counter");
    startBtn = document.getElementById("start");
    sounds.push(new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"));
    sounds.push(new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"));
    sounds.push(new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"));
    sounds.push(new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"));

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            if (isActive) {
                curArr.push(i);
                sounds[i].play();
                var collor = window.getComputedStyle(buttons[i]).backgroundColor;
                buttons[i].style.backgroundColor = "lightcyan";
                setTimeout(function () {
                    buttons[i].style.backgroundColor = collor;
                    check();
                }, 400);
            }
        }
    }

    document.getElementById("on-off").onclick = function () {
        isActive = !this.classList.toggle("off");
        if (isActive) {
            counter.innerHTML = "00";
        }
        else {
            counter.innerHTML = "--";
            curArr = [];
            gameArr = [];
            curBtn = 0;
        }
    };
    startBtn.onclick = function () {
        if (isActive) {
            curArr = [];
            gameArr = [];
            curBtn = 0;
            counter.innerHTML = "00";
            setTimeout(nextStage, 500);
        }
    }
    document.getElementById("strict").onclick = function () {
        isStrict = isStrict ? false : true;
        this.classList.toggle("active", isStrict);
    }
}

function nextStage() {
    var a = Math.round((Math.random() * 3));
    gameArr.push(a);
    showWay();
}

function showWay() {
    if (gameArr.length < 10) {
        counter.innerHTML = "0" + gameArr.length;
    }
    else {
        counter.innerHTML = gameArr.length;
    }
    var i = 0, time = 400;
    var ind = setInterval(function () {
        if (i >= gameArr.length) {
            clearInterval(ind);
            return;
        }
        var j = gameArr[i];
        sounds[j].play();
        var color = window.getComputedStyle(buttons[j]).backgroundColor;
        buttons[j].style.backgroundColor = "lightcyan";
        setTimeout(function () {
            buttons[j].style.backgroundColor = color;
            i++;
        }, time);
    }, 1000);
}

function check() {
    if (curArr[curBtn] == gameArr[curBtn]) {
        curBtn++;
    }
    else {
        counter.innerHTML = "ER";
        curArr = [];
        curBtn = 0;
        if (isStrict) {
            setTimeout(function () {
                startBtn.click();
            }, 1500);
        }
        else {
            setTimeout(function () {
                showWay();
            }, 1500);
        }
        return;
    }

    if (curBtn == gameArr.length) {
        nextStage();
        curBtn = 0;
        curArr = [];
    }

    if (curBtn == 20) {
        counter.innerHTML = "++";
        setTimeout(function () {
            startBtn.click();
        }, 1500)
    }
}