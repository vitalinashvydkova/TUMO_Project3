let sun;
let moon;
let star;

function preload() {
    sun = loadImage('sun2.png');
    moon = loadImage('moon.png');
    star = loadImage('sparkler.png');
}

function setup() {
    createCanvas(800, 800);
    Game.addSunGalaxy();
}

function draw() {
    background('black');

    for (let galaxy of Game.galaxies) {
        galaxy.display();
        galaxy.move(Game.score);

        if (galaxy.y < 25 && galaxy.constructor.name != 'MoonGalaxy') {
            noLoop();
            clearInterval(interval);
            Game.galaxies.length = 0;
            background(255, 219, 77);
            let finalScore = Game.score;
            Game.score = '';

            textSize(64);
            fill('white');
            textAlign(CENTER, CENTER);
            text('FINISH', 400, 400);

            textSize(34);
            text('Score: ' + finalScore, 400, 500);
        }
    }

    textSize(32);
    fill('white');
    text(Game.score, 20, 40);

    if (frameCount % 80 === 0) {
        Game.addSunGalaxy();
    }

    if (frameCount % 150 === 0) {
        Game.addStarGalaxy();
    }

    if (frameCount % 170 === 0) {
        Game.addMoonGalaxy();
    }
}

// function getMousePosition(canvas, event) {
//     let rect = canvas.getBoundingClientRect();
//     let x = event.clientX - rect.left;
//     let y = event.clientY - rect.top;
//     console.log("Coordinate x: " + x,
//                 "Coordinate y: " + y);
// }

// let canvasElem = document.querySelector("canvas");

// canvasElem.addEventListener("mousedown", function(e)
// {
//     getMousePosition(canvasElem, e);
// });

function mousePressed() {
    if (!isLooping()) {
        loop();
        interval = setInterval(() => {
            Game.sendStatistics();
        }, 5000);
        Game.score = 0;
    }
    Game.checkIfGalaxyBurst();
}

let interval = setInterval(() => {
    Game.sendStatistics();
}, 5000);

class Game {
    static galaxies = [];
    static sunCount = 0;
    static starCount = 0;
    static moonCount = 0;
    static score = 0;

    static addSunGalaxy() {
        let sunGalaxy = new SunGalaxy('color', 25);
        this.galaxies.push(sunGalaxy);
    }

    static addStarGalaxy() {
        let starGalaxy = new StarGalaxy('color', 15);
        this.galaxies.push(starGalaxy);
    }

    static addMoonGalaxy() {
        let moonGalaxy = new MoonGalaxy('color', 25);
        this.galaxies.push(moonGalaxy);
    }

    static checkIfGalaxyBurst() {
        this.galaxies.forEach((galaxy, index) => {
            // let audio = new Audio('sound.wav');
            // audio.play();
            let distance = dist(galaxy.x, galaxy.y, galaxy.diameter, mouseX, mouseY);
            if ((distance <= galaxy.x, galaxy.y, galaxy.diameter / 200)) {
                let audio = new Audio('sound.wav');
                audio.play();
                galaxy.burst(index);
            }
        });
    }
    static sendStatistics() {
        let statistics = {
            sunBurst: this.sunCount,
            starBurst: this.starCount,
            moonBurst: this.moonCount,
            score: this.score,
        };

        fetch('/statistic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statistics),
        });
    }
}

class SunGalaxy {
    constructor() {
        this.x = random(width);
        this.y = random(height - 10, height + 50);
        (this.diameter = 200), 10;
    }

    display() {
        image(sun, this.x, this.y, this.diameter);
    }

    move(score) {
        if (score < 50) {
            this.y -= 1;
        } else if (score > 50 && score < 100) {
            this.y -= 1.5;
        } else {
            this.y -= 2;
        }
    }

    burst(index) {
        Game.galaxies.splice(index, 1);
        Game.score += 1;
        Game.sunCount += 1;
    }
}

class StarGalaxy {
    constructor() {
        this.x = random(width);
        this.y = random(height - 10, height + 50);
        (this.diameter = 200), 10;
    }

    display() {
        image(star, this.x, this.y, this.diameter);
    }

    move(score) {
        if (score < 50) {
            this.y -= 1;
        } else if (score > 50 && score < 100) {
            this.y -= 1.5;
        } else {
            this.y -= 2;
        }
    }

    burst(index) {
        Game.galaxies.splice(index, 1);
        Game.score += 10;
        Game.starCount += 1;
    }
}

class MoonGalaxy {
    constructor() {
        this.x = random(width);
        this.y = random(height - 10, height + 50);
        (this.diameter = 200), 10;
    }

    display() {
        image(moon, this.x, this.y, this.diameter);
    }

    move(score) {
        if (score < 50) {
            this.y -= 1;
        } else if (score > 50 && score < 100) {
            this.y -= 1.5;
        } else {
            this.y -= 2;
        }
    }

    burst(index) {
        Game.galaxies.splice(index, 1);
        Game.score -= 10;
        Game.moonCount += 1;
    }
}
