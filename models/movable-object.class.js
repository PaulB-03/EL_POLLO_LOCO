class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 2;
    otherDirection = false;
    hitboxOffset = {top: 0, right: 0, bottom: 0, left: 0};
    energy = 100;
    lastHit = 0;
    numberOfCoins = 0;
    numberOfBottles = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 155;
        }
    }

    jump() {
        this.speedY = 30;
    }

    isColliding(mo) {
        return this.x + this.hitboxOffset.left < mo.x + mo.width - mo.hitboxOffset.right &&
               this.x + this.width - this.hitboxOffset.right > mo.x + mo.hitboxOffset.left &&
               this.y + this.hitboxOffset.top < mo.y + mo.height - mo.hitboxOffset.bottom &&
               this.y + this.height - this.hitboxOffset.bottom > mo.y + mo.hitboxOffset.top;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
}