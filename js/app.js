// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.step = 101;
    this.boundary = this.step * 5;
};

playersBox = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];

// Container holding player images and loop to update them in HTML
let playerContainer = document.getElementById('players-container');
playerContainer.innerHTML = "";
for (var i = 0; i < playersBox.length; i++) {
    // Update the playerContainer div with each player image
    playerContainer.innerHTML += '<img src=\"'+playersBox[i]+'\">';
    // add class to each image - get images
    const playerChoice = document.querySelectorAll('#players-container img');
    // set class of each image to .playerChoice
    playerChoice[i].className = 'players-to-choose';
}

// listen to each player image, on click update sprite's image
let playerInBox = document.querySelectorAll('.players-to-choose');
for (var p = 0; p < playerInBox.length; p++) {
    playerInBox[p].addEventListener('click', function() {
        console.log('click new');
    })
}

// document.getElementById('players-container').innerHTML = '<img src=\"images/char-pink-girl.png\">';
// Hero class
class Hero {
    constructor() {
        // this.sprite will change from event listener
        this.sprite = playersBox[2];
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
    }

    // Methods
    update() {

        // Check collision here
        for (let enemy of allEnemies) {
            // did player x and y collide with enemy?
            if (this.y === enemy.y &&
                (enemy.x + enemy.step / 2 > this.x &&
                enemy.x < this.x + this.step / 2)) {
                this.reset();
            }
        }
        // Check for victory
        // Did player y reach final tile row?
        if (this.y < 55) { // if hero is within 55 pixels of top
            setTimeout(function() {
                // alert("Hello");
            }, 1000);
            this.victory = true;

        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Handle keyboard input
    // Update player's x and y property according to input
    // @param {string} input - direction to travel

    handleInput(input) {
        switch (input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) { // if player is to the left of the fifth column, move to the right
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    }

    // Reset hero
    reset() {
        // Set x and y to starting point
        this.x = this.startX;
        this.y = this.startY;
    }
}


// Place the player object in a variable called player
const player = new Hero();
// create enemy pbject and store in variable
const bug1 = new Enemy(-101, 0, 250);
// create array for all enemies and push bug1 into it
const bug2 = new Enemy(-101, 83, 200);
const bug3 = new Enemy((-101 * 2.5), 166, 400);
// init allEnemies array
const allEnemies = [];
// for each enemy create and push a new Enemy into above array
// Place all enemy objects in an array called allEnemies
allEnemies.push(bug1, bug2, bug3);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy is not passed boundary
    if (this.x < this.boundary) {
        // move forward
        // increment x by speed * dt
        this.x += (this.speed * dt) / 2; // changing "/1" - overall enemy speed
    } else {
        this.x = -83; // reset pos to start
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/* TODO: setting to change enemy speeds for difficulties
allow selection of differentplayer sprites
create a rating


*/