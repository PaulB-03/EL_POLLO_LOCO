class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 280;
    height = 150;
    width = 100;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Coin || this instanceof SalsaBottle) {
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
}