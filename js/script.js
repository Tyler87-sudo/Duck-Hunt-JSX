//Import birds:

redbirdColor = document.getElementById("redbird")
bluebirdColor = document.getElementById("bluebird");
yellowbirdColor = document.getElementById("yellowbird")

//Import Gunshot Sounds

let gunshot1 = document.getElementById("gunshotSniper1")
let gunshot2 = document.getElementById("gunshotShotgun1")
let gunshot3 = document.getElementById("lasergunShot1")

// Makes elements undraggable

document.getElementById("redbird").ondragstart = function() {
    return false;
}

document.getElementById("bluebird").ondragstart = function() {
    return false;
}

document.getElementById("yellowbird").ondragstart = function() {
    return false;
}

document.getElementById("crosshair").ondragstart = function() {
    return false;
}

//Import Assets

let crosshair = document.getElementById("crosshair")

//adds crosshair asset to the current mouse position

document.addEventListener('mousemove', (e) => {
    crosshair.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
});

//adds global variables required in functions

let blueleftPos = 1;
let bluetopPos = 1;
let redleftPos = 50;
let redTopPos = 100;
let yellowLeftPos = 0;
let yellowTopPos = 0;
let blueMoveUp = true;
let blueMoveRight = true;
let redMoveRight = true;
let redMoveUp = true;
let yellowMoveUp;
let yellowMoveRight;
let blueUp = document.getElementById("blueflyup")
let blueStraight = document.getElementById("blueflystraight")
let blueDown = document.getElementById("blueflydown")
let redUp = document.getElementById("redflyup")
let redStraight = document.getElementById("redflystraight")
let redDown = document.getElementById("redflydown")
let yellowUp = document.getElementById("yellowflyup")
let yellowDown = document.getElementById("yellowflydown")
let yellowStraight = document.getElementById("yellowflystraight")
let blueAfterKill;
let redAfterKill
let yellowAfterKill;
let killCount = 0;

//functions for bird animations
function bluebird() {
    if (bluebirdColor.style.display === "none" && blueAfterKill === true)  {
        bluebirdColor.style.display = "block"
        blueleftPos = Math.floor(Math.random() * window.innerWidth)
        bluetopPos = Math.floor(Math.random() * window.innerHeight)
        blueAfterKill = false;
        let b = document.getElementById("bloodsplatterblue")
        b.currentTime = 0;
    }

    bluebirdColor.style.left = blueleftPos + "px";

    if (blueMoveUp) {
        bluetopPos -= 1;
        blueStraight.style.display = "none";
        blueUp.style.display = "block";
        blueDown.style.display = "none"
    } else {
        bluetopPos += 1;
        blueStraight.style.display = "none";
        blueUp.style.display = "none";
        blueDown.style.display = "block"
    }

    if (blueMoveRight) {
        blueleftPos += 1
    } else {
        blueleftPos -= 1;
    }

    bluebirdColor.style.top = bluetopPos + "px";

    if (bluetopPos <= 0) {
        blueMoveUp = false;
    } else if (bluetopPos >= window.innerHeight) {
        blueMoveUp = true;
        blueStraight.style.display = "none";
        blueUp.style.display = "block";
    }

    if (blueleftPos <= 0) {
        blueMoveRight = true
        bluebirdColor.style.transform = "rotateY(0deg)"
    } else if (blueleftPos >= window.innerWidth) {
        blueMoveRight = false
        bluebirdColor.style.transform = "rotateY(180deg)"
    }

    bluebirdID = requestAnimationFrame(bluebird);
}

let frames_per_second = 120;

let interval = Math.floor(1000 / frames_per_second);
let startRedTime = performance.now();
let previousRedTime = startRedTime;

let currentRedTime = 0;
let deltaRedTime = 0;

function redbird(timestampred) {
    currentRedTime = timestampred;
    deltaRedTime = currentRedTime - previousRedTime;

    if (deltaRedTime > 0) {
        frames_per_second = deltaRedTime
    }

    if (deltaRedTime > interval) {
        previousRedTime = currentRedTime - (deltaRedTime % interval);
        console.log(deltaRedTime);

        if (redbirdColor.style.display === "none" && redAfterKill === true)  {
            redbirdColor.style.display = "block"
            redleftPos = Math.floor(Math.random() * window.innerWidth)
            redTopPos = Math.floor(Math.random() * window.innerHeight)
            redAfterKill = false;
            let b = document.getElementById("bloodsplatterred")
            b.currentTime = 0;
        }

        redbirdColor.style.left = redleftPos + "px";

        if (redMoveUp) {
            redTopPos -= 5;
            redUp.style.display = "block";
            redStraight.style.display = "none"
            redDown.style.display = "none"
        } else {
            redTopPos += 5;
            redUp.style.display = "none";
            redStraight.style.display = "none"
            redDown.style.display = "block"
        }

        if (redMoveRight) {
            redleftPos += 2
        } else {
            redleftPos -= 2
        }

        redbirdColor.style.top = redTopPos + "px";

        if (redTopPos <= 0) {
            redMoveUp = false;
            redStraight.style.display = "none";
            redUp.style.display = "none";
            redDown.style.display = "block"
        } else if (redTopPos >= window.innerHeight) {
            redMoveUp = true;
            redStraight.style.display = "none";
            redUp.style.display = "block";
        }

        if (redleftPos <= 0) {
            redMoveRight = true
            redbirdColor.style.transform = "rotateY(0deg)"
        } else if (redleftPos >= window.innerWidth) {
            redMoveRight = false
            redbirdColor.style.transform = "rotateY(180deg)"
        }

    }

    redbirdID = requestAnimationFrame(redbird);
}

let startYellowTime = performance.now();
let previousYellowTime = startYellowTime;

let currentYellowTime = 0;
let deltaYellowTime = 0;

function yellowbird(timestampyellow) {
    currentYellowTime = timestampyellow;
    deltaYellowTime = currentYellowTime - previousYellowTime;

    if (deltaYellowTime > interval) {
        previousYellowTime = currentYellowTime - (deltaYellowTime % interval);

        if (yellowbirdColor.style.display === "none" && yellowAfterKill === true) {
            yellowbirdColor.style.display = "block"
            yellowLeftPos = Math.floor(Math.random() * window.innerWidth)
            yellowTopPos = Math.floor(Math.random() * window.innerHeight)
            yellowAfterKill = false;
            let b = document.getElementById("bloodsplatteryellow")
            b.currentTime = 0;
        }

            yellowbirdColor.style.left = yellowLeftPos + "px";

            if (yellowMoveUp) {
                yellowTopPos -= 3;
                yellowUp.style.display = "block";
                yellowStraight.style.display = "none"
                yellowDown.style.display = "none"
            } else {
                yellowTopPos += 3;
                yellowUp.style.display = "none";
                yellowStraight.style.display = "none"
                yellowDown.style.display = "block"
            }

            if (yellowMoveRight) {
                yellowLeftPos += 3
            } else {
                yellowLeftPos -= 3
            }

            yellowbirdColor.style.top = yellowTopPos + "px";

            if (yellowTopPos <= 0) {
                yellowMoveUp = false;
            } else if (yellowTopPos >= window.innerHeight) {
                yellowMoveUp = true;
            }

            if (yellowLeftPos <= 0) {
                yellowMoveRight = true
                yellowbirdColor.style.transform = "rotateY(0deg)"
            } else if (yellowLeftPos >= window.innerWidth) {
                yellowMoveRight = false
                yellowbirdColor.style.transform = "rotateY(180deg)"
            }


        }
        yellowbirdID = requestAnimationFrame(yellowbird);
    }

requestAnimationFrame(bluebird);
requestAnimationFrame(redbird);
requestAnimationFrame(yellowbird);

bluebirdColor.addEventListener("click", () => {
    cancelAnimationFrame(bluebirdID);
    console.log("click fired")
    let style = getComputedStyle(bluebirdColor);
    birdYPos = style.getPropertyValue("top")
    birdXPos = style.getPropertyValue("left")
    let b = document.getElementById("bloodsplatterblue")
    b.style.display = "block"
    b.style.left = parseInt(birdXPos, 10) - 50 + "px"
    b.style.top = parseInt(birdYPos, 10) - 40 + "px"
    b.style.position = "fixed"
    b.currentTime = 3;
    gunshot3.play();
    bluebirdColor.style.display = "none";
    setTimeout(() => {
        requestAnimationFrame(bluebird);
        blueAfterKill = true;
    }, 1000)
    killCounter = document.getElementById("kills")
    killCount++
    killCounter.innerText = "Killcount: " + killCount
});

document.onclick = function() {
    if (gunshot1.paused === true && gunshot2.paused === true && gunshot3.paused === true) {
        if (gunshot1.currentTime === 0) {
            gunshot1.play()
            console.log(gunshot2.paused)
        }
    }


    setTimeout(gunshot1.currentTime = 0, 10000)
}

redbirdColor.addEventListener("click", (e) => {
    cancelAnimationFrame(redbirdID)
    console.log("click fired")
    let style = getComputedStyle(redbirdColor);
    birdYPos = style.getPropertyValue("top")
    birdXPos = style.getPropertyValue("left")
    let b = document.getElementById("bloodsplatterred")
    b.style.display = "block"
    b.style.left = parseInt(birdXPos, 10) - 50 + "px"
    b.style.top = parseInt(birdYPos, 10) - 40 + "px"
    b.style.position = "fixed"
    b.currentTime = 3;
    gunshot2.play();
    redbirdColor.style.display = "none";
    setTimeout(() => {
        requestAnimationFrame(redbird);
        redAfterKill = true;
    }, 1000)
    killCounter = document.getElementById("kills")
    killCount++
    killCounter.innerText = "Killcount: " + killCount
})

yellowbirdColor.addEventListener("click", (e) => {
    cancelAnimationFrame(yellowbirdID)
    let style = getComputedStyle(yellowbirdColor);
    birdYPos = style.getPropertyValue("top")
    birdXPos = style.getPropertyValue("left")
    let b = document.getElementById("bloodsplatteryellow")
    b.style.display = "block"
    b.style.left = parseInt(birdXPos, 10) - 50 + "px"
    b.style.top = parseInt(birdYPos, 10) - 40 + "px"
    b.style.position = "fixed"
    b.currentTime = 3;
    gunshot1.play();
    yellowbirdColor.style.display = "none";
    setTimeout(() => {
        requestAnimationFrame(yellowbird);
        yellowAfterKill = true;
    }, 1000)
    killCounter = document.getElementById("kills")
    killCount++
    killCounter.innerText = "Killcount: " + killCount
})