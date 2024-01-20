//Import birds:

redbirdColor = document.getElementById("redbird")
bluebirdColor = document.getElementById("bluebird");
yellowbirdColor = document.getElementById("yellowbird")

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

//Declare Xmove, Ymove and Rotational variables:

let firstMove = true;
let xMoves = []
let yMoves = [];

//Test Code

let start, previousTimeStamp;
let done = false;

function generateXMove() {
    //makes sure the first move is always at x = 0 and y = 0 on viewport
    if (firstMove === true) {
        xMoves[0] = 0;
        firstMove = false;
    } else {
        let c = getComputedStyle(redbirdColor);
        birdYPos = c.getPropertyValue("top")
        birdXPos = c.getPropertyValue("left")
        let x = parseInt(birdXPos);
        console.log(birdXPos)
        console.log(birdYPos)
        //Clears array before adding new value, so xMoves[0] is always the correct value!
        xMoves = []
        xMoves.push(x + 0.000001)
    }
}

let firstYMove = true;


function generateYMove() {
    let c = getComputedStyle(redbirdColor);
    birdYPos = c.getPropertyValue("top")
    let x = parseInt(birdYPos);
    let moveDecider = Math.round(Math.random() * 10)
    yMoves[0] = Math.floor(Math.random() * window.screen.height)
    if (yMoves[0] > 600 && firstYMove === true) {
        yMoves[0] = 500
        firstYMove = false;
    }
    if (moveDecider === 0 || x < 100) {
        yMoves.push(x + 20)
        if (yMoves[0] > yMoves[1]) {
            //loop through a foreach array (get the element using queryselector!!!)
            document.getElementById("redflyup").style.display = "none"
            document.getElementById("redflydown").style.display = "none"
            document.getElementById("redflystraight").style.display = "block"
        } else if (yMoves[0] < yMoves[1]) {
            document.getElementById("redflyup").style.display = "none"
            document.getElementById("redflydown").style.display = "none"
            document.getElementById("redflystraight").style.display = "block"

        }
        yMoves = []
        yMoves[0] = x + 20
    } else {
        yMoves.push(x - 20)
        if (yMoves[0] > yMoves[1]) {
            document.getElementById("redflyup").style.display = "none"
            document.getElementById("redflystraight").style.display = "none"
            document.getElementById("redflydown").style.display = "block"
        } else if (yMoves[0] < yMoves[1]) {
            document.getElementById("redflyup").style.display = "none"
            document.getElementById("redflystraight").style.display = "none"
            document.getElementById("redflydown").style.display = "block"
        }
        yMoves = []
        yMoves[0] = x - 20
    }
}

//adds crosshair asset to the current mouse position

document.addEventListener('mousemove', (e) => {
    crosshair.style.transform = `translate(${e.clientX - 23}px, ${e.clientY - 23}px)`;
});

//generates a move to the left or to the right


let scale = [1]

let redleftPos = 0;
let redTopPos = 0;
let blueleftPos = 0;
let bluetopPos = 0;
let lastTime;

generateYMove();

let number;
let xMove
let lastXPosition = []
let yMove;

function performYMoveDown(time) {
    redTopPos += 1
    redleftPosExtCounter = redbirdColor.getBoundingClientRect().x
    redleftPosExtCounter += 0.1
    console.log(redbirdColor.getBoundingClientRect().x)
    redbirdID = requestAnimationFrame(performYMove)
    if (lastTime != null) {
        const delta = time - lastTime
        redbirdColor.style.top = `${parseFloat(redTopPos) + delta * 0.3}px`
        redbirdColor.style.left = `${parseFloat(redleftPosExtCounter) + delta * 0.3}px`
        if (redbirdColor.getBoundingClientRect().y > 100) {
            cancelAnimationFrame(redbirdID)
            yMove = "cancelled"
            requestAnimationFrame(redbird);
        }
    }
    lastTime = time
    console.log(redbirdColor.getBoundingClientRect().x);}

function performYMoveUp(time) {
    redTopPos += 1
    redleftPosExtCounter = redbirdColor.getBoundingClientRect().x
    redleftPosExtCounter += 0.1
    console.log(redbirdColor.getBoundingClientRect().x)
    redbirdID = requestAnimationFrame(performYMoveUp)
    document.getElementById("redflyup").style.display = "none";
    document.getElementById("redflystraight").style.display = "none";
    document.getElementById("redflydown").style.display = "block";
    if (lastTime != null) {
        const delta = time - lastTime
        redbirdColor.style.top = `${parseFloat(redTopPos) + delta * 0.3}px`
        redbirdColor.style.left = `${parseFloat(redleftPosExtCounter) + delta * 0.3}px`
        if (redbirdColor.getBoundingClientRect().y > 100) {
            cancelAnimationFrame(redbirdID)
            yMove = "cancelled"
            requestAnimationFrame(redbird);
        }
    }
    lastTime = time
    console.log(redbirdColor.getBoundingClientRect().x);
}

function redbird(time) {
    generateXMove();
    // generateYMove();
    document.getElementById("redflyup").style.display = "none";
    document.getElementById("redflystraight").style.display = "block";
    document.getElementById("redflydown").style.display = "none";
    redleftPos += 1;
    redTopPos += 0.1;
    redbirdColor.style.position = "absolute";
    redbirdID = requestAnimationFrame(redbird)
    if (lastTime != null) {
        const delta = time - lastTime
        redbirdColor.style.left = `${parseFloat(xMoves[0]) + delta * 0.3}px`
        if (redbirdColor.getBoundingClientRect().x > 200) {
           cancelAnimationFrame(redbirdID)
            xMove = "cancelled"
            performYMoveUp();
           lastXPosition.push(redbirdColor.getBoundingClientRect().x)
        }
    }
    lastTime = time
    console.log(redbirdColor.getBoundingClientRect().x);
}

function performXMoveLeft() {

}

function performXMoveRight() {

}

let f;
let i;

function bluebird() {
    blueleftPos += 0.1;
    bluebirdColor.style.left = blueleftPos + "px";
    for (i < 10; i++; ) {
        bluetopPos += 1;
    }

    bluetopPos -= 0.1

    bluebirdColor.style.top = bluetopPos + "px";
    bluebirdColor.style.position = "absolute";
    bluebirdID = requestAnimationFrame(bluebird)
}

function cancelAnimation() {
    console.log("click fired")
}

requestAnimationFrame(bluebird);
requestAnimationFrame(redbird)

redbirdColor.addEventListener("click", (e) => {
    cancelAnimationFrame(redbirdID)
    console.log("click fired")
})

yellowbirdColor.addEventListener("click", (e) => {
    cancelAnimationFrame(redbird)
    console.log("click fired")
})

bluebirdColor.addEventListener("click", (e) => {
    cancelAnimationFrame(bluebirdID)
    console.log("click fired")
})