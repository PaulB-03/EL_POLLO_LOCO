class SalsaBottle extends MovableObject {
    height = 80;
    width = 80;
    y = 360;
    IMAGE = "img/6_salsa_bottle/2_salsa_bottle_on_ground.png";
    hitboxOffset = {top: 18, right: 25, bottom: 5, left: 20};

    constructor(x) {
        super().loadImage(this.IMAGE);
        this.x = x;
    }
}