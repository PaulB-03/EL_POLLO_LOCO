let canvas;
let world;
let keyboard = new Keyboard();



function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (event) => {
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (event.key == "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if (event.key == "ArrowUp") {
        keyboard.UP = true;
    }
    if (event.key == "ArrowDown") {
        keyboard.DOWN = true;
    }
    if (event.key == " ") {
        keyboard.SPACE = true;
    }
    if (event.key == "d" || event.key == "D") {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (event.key == "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if (event.key == "ArrowUp") {
        keyboard.UP = false;
    }
    if (event.key == "ArrowDown") {
        keyboard.DOWN = false;
    }
    if (event.key == " ") {
        keyboard.SPACE = false;
    }
    if (event.key == "d" || event.key == "D") {
        keyboard.D = false;
    }
});

function startGame() {
    hideStartScreen();
    init();
}

function hideStartScreen() {
    document.getElementById("start-screen").classList.add("dp_none");
}

function toggleFullscreen() {
    canvasContainer = document.getElementById("canvas-container");
    if (!document.fullscreenElement) {
        canvasContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function restartGame() {
    clearCanvas();
    resetGameWorld();
}

function clearCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resetGameWorld() {
    world.reset();
    world = null;
    init();
}

function gameWin () {
    
}