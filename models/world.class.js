class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    bossBar = new BossBar();
    throwableObjects = [];


    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext("2d");
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000 / 5);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.numberOfBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 120);
            this.throwableObjects.push(bottle);
            this.character.numberOfBottles--;
            this.bottleBar.setPercentage(this.character.numberOfBottles * 20);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }

                if (this.throwableObjects.some((bottle) => bottle.isColliding(enemy))) {
                    console.log("Enemy hit!", enemy, index);
                    this.level.enemies.splice(index, 1);
                }
            });
        this.level.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin)) {
                    this.character.numberOfCoins += 1;
                    this.coinBar.setPercentage(this.character.numberOfCoins * 20);
                    this.level.coins.splice(index, 1);
                }
            });
        this.level.salsa_bottles.forEach((bottle, index) => {
                if (this.character.isColliding(bottle)) {
                    this.character.numberOfBottles += 1;
                    this.bottleBar.setPercentage(this.character.numberOfBottles * 20);
                    this.level.salsa_bottles.splice(index, 1);
                }
            });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsa_bottles);
        this.addToMap(this.bossBar);
        

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);


        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}