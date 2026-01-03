class Coin extends MovableObject {
    height = 80;
    width = 80;
    y = 360;
    IMAGE = "img/8_coin/coin_1.png";
    hitboxOffset = {top: 25, right: 25, bottom: 25, left: 25};

    constructor(x) {
        super().loadImage(this.IMAGE);
        this.x = x;
    }
}