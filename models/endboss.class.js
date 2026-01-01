class Endboss extends MovableObject {

    y = 360;
    height = 60;
    width = 60;
    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png"
    ]

    constructor() {
        super().loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200;
        this.speed = 0.15;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 10);
    }
}