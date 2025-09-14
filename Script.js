// script.js

const gameArea = document.getElementById('game-area');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');

let basketPosition = 180;
let score = 0;

// Move basket with arrow keys
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && basketPosition > 0) {
        basketPosition -= 20;
    }
    if (e.key === 'ArrowRight' && basketPosition < 360) {
        basketPosition += 20;
    }
    basket.style.left = basketPosition + 'px';
});

// Create falling objects
function createObject() {
    const obj = document.createElement('div');
    obj.classList.add('falling-object');
    obj.style.left = Math.floor(Math.random() * 380) + 'px';
    obj.style.top = '0px';
    gameArea.appendChild(obj);
    fall(obj);
}

// Animate falling object
function fall(obj) {
    let top = 0;
    const interval = setInterval(() => {
        top += 5;
        obj.style.top = top + 'px';

        if (checkCollision(obj)) {
            clearInterval(interval);
            obj.remove();
            score += 1;
            scoreDisplay.textContent = 'Score: ' + score;
        } else if (top >= 600) {
            clearInterval(interval);
            obj.remove();
        }
    }, 20);
}

// Check if object hits basket
function checkCollision(obj) {
    const objRect = obj.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    return !(
        objRect.bottom < basketRect.top ||
        objRect.top > basketRect.bottom ||
        objRect.right < basketRect.left ||
        objRect.left > basketRect.right
    );
}

// Generate objects every second
setInterval(createObject, 1000);
