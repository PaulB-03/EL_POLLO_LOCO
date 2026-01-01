class MovableObject {
    x = 100;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    speedY = 0;
    acceleration = 2;
    otherDirection = false;
    hitboxOffset = {top: 0, right: 0, bottom: 0, left: 0};
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 155;
    }

    jump() {
        this.speedY = 30;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            // Hitbox
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.x + this.hitboxOffset.left,
                this.y + this.hitboxOffset.top,
                this.width - this.hitboxOffset.left - this.hitboxOffset.right,
                this.height - this.hitboxOffset.top - this.hitboxOffset.bottom
            );
            ctx.stroke();
        }
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

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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