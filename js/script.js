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
    crosshair.style.transform = `translate(${e.clientX - 23}px, ${e.clientY - 23}px)`;
});

let blueleftPos = 1;
let bluetopPos = 1;
let redleftPos = 50;
let redTopPos = 100;
let blueMoveUp = true;
let blueMoveRight = true;
let redMoveRight = true;
let redMoveUp = true;

let blueUp = document.getElementById("blueflyup")
let blueStraight = document.getElementById("blueflystraight")
let blueDown = document.getElementById("blueflydown")
let redUp = document.getElementById("redflyup")
let redStraight = document.getElementById("redflystraight")
let redDown = document.getElementById("redflydown")
let blueAfterKill;

function bluebird() {
    if (bluebirdColor.style.display === "none" && blueAfterKill === true)  {
        bluebirdColor.style.display = "block"
        bluebirdColor.style.left = 0 + "px"
        bluebirdColor.style.top = 0 + "px"
        blueleftPos = 0
        bluetopPos = 0
        blueAfterKill = false;
    }

    bluebirdColor.style.left = blueleftPos + "px";

    if (blueMoveUp) {
        bluetopPos -= 1;
    } else {
        bluetopPos += 1;
    }

    if (blueMoveRight) {
        blueleftPos += 1
    } else {
        blueleftPos -= 1;
    }

    bluebirdColor.style.top = bluetopPos + "px";

    if (bluetopPos <= 0) {
        blueMoveUp = false;
        blueStraight.style.display = "none";
        blueUp.style.display = "none";
        blueDown.style.display = "block"
    } else if (bluetopPos >= window.innerHeight - bluebirdColor.clientHeight) {
        blueMoveUp = true;
        blueStraight.style.display = "none";
        blueUp.style.display = "block";
    }

    if (blueleftPos <= 0) {
        blueMoveRight = true
        bluebirdColor.style.transform = "rotateY(0deg)"
    } else if (blueleftPos >= window.innerWidth - bluebirdColor.clientWidth) {
        blueMoveRight = false
        bluebirdColor.style.transform = "rotateY(180deg)"
    }

    bluebirdID = requestAnimationFrame(bluebird);
}

let redAfterKill
let yellowAfterKill

function redbird() {
    if (redbirdColor.style.display === "none" && redAfterKill === true)  {
        redbirdColor.style.display = "block"
        redbirdColor.style.left = 50 + "px"
        redbirdColor.style.top = 50 + "px"
        redleftPos = 50
        redleftPos = 50
        redAfterKill = false;
    }

    redbirdColor.style.left = redleftPos + "px";

    if (redMoveUp) {
        redTopPos -= 5;
    } else {
        redTopPos += 5;
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
    } else if (redTopPos >= window.innerHeight - redbirdColor.clientHeight) {
        redMoveUp = true;
        redStraight.style.display = "none";
        redUp.style.display = "block";
    }

    if (redleftPos <= 0) {
        redMoveRight = true
        redbirdColor.style.transform = "rotateY(0deg)"
    } else if (redleftPos >= window.innerWidth - redbirdColor.clientWidth) {
        redMoveRight = false
        redbirdColor.style.transform = "rotateY(180deg)"
    }

    redbirdID = requestAnimationFrame(redbird);
}

let yellowLeftPos;
let yellowTopPos;
let yellowMoveUp
let yellowMoveRight

function yellowbird() {
    if (yellowbirdColor.style.display === "none" && yellowAfterKill === true)  {
        yellowbirdColor.style.display = "block"
        yellowbirdColor.style.left = 50 + "px"
        yellowbirdColor.style.top = 50 + "px"
        yellowLeftPos = 100
        yellowTopPos = 100
        yellowAfterKill = false;
    }

    yellowbirdColor.style.left = yellowLeftPos + "px";

    if (yellowMoveUp) {
        yellowTopPos -= 3;
    } else {
        yellowTopPos += 3;
    }

    if (yellowMoveRight) {
        yellowLeftPos += 3
    } else {
        yellowLeftPos -= 3
    }

    yellowbirdColor.style.top = yellowTopPos + "px";

    if (yellowTopPos <= 0) {
        yellowMoveUp = false;
        redStraight.style.display = "none";
        redUp.style.display = "none";
        redDown.style.display = "block"
    } else if (yellowTopPos >= window.innerHeight - yellowbirdColor.clientHeight) {
        yellowMoveUp = true;
        redStraight.style.display = "none";
        redUp.style.display = "block";
    }

    if (yellowLeftPos <= 0) {
        yellowMoveRight = true
        yellowbirdColor.style.transform = "rotateY(0deg)"
    } else if (yellowLeftPos >= window.innerWidth - yellowbirdColor.clientWidth) {
        yellowMoveRight = false
        yellowbirdColor.style.transform = "rotateY(180deg)"
    }

    yellowbirdID = requestAnimationFrame(yellowbird);
}

requestAnimationFrame(bluebird);
requestAnimationFrame(redbird)
requestAnimationFrame(yellowbird)

let killCount = 0;

bluebirdColor.addEventListener("click", () => {
    cancelAnimationFrame(bluebirdID);
    console.log("click fired")
    let style = getComputedStyle(bluebirdColor);
    birdYPos = style.getPropertyValue("top")
    birdXPos = style.getPropertyValue("left")
    let b = document.getElementById("bloodsplatter")
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
    killCounter.innerText = "Score: " + killCount
});

document.onclick = function() {
    if (gunshot1.currentTime === 0) {
        gunshot1.play()
    }
    setTimeout(gunshot1.currentTime = 0, 10000)
}

redbirdColor.addEventListener("click", (e) => {
    cancelAnimationFrame(redbirdID)
    console.log("click fired")
    let style = getComputedStyle(redbirdColor);
    birdYPos = style.getPropertyValue("top")
    birdXPos = style.getPropertyValue("left")
    let b = document.getElementById("bloodsplatter")
    b.style.display = "block"
    b.style.left = parseInt(birdXPos, 10) - 50 + "px"
    b.style.top = parseInt(birdYPos, 10) - 40 + "px"
    b.style.position = "fixed"
    b.currentTime = 3;
    gunshot3.play();
    redbirdColor.style.display = "none";
    setTimeout(() => {
        requestAnimationFrame(redbird);
        redAfterKill = true;
    }, 1000)
    killCounter = document.getElementById("kills")
    killCount++
    killCounter.innerText = "Score: " + killCount
})