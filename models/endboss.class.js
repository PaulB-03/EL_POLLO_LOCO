class Endboss extends MovableObject {

    y = 0;
    height = 450;
    width = 400;
    hitboxOffset = {top: 80, right: 18, bottom: 15, left: 18};
    bossEnergy = 100;
    bossIsDead = false;
    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png"
    ]

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png"
    ]

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        

        this.x = 4500;
        if (this.bossIsDead === false) {
            this.animate(this.IMAGES_WALKING);
        }
    }

    animate(IMAGES) {
        if (this.bossEnergy <=0) return; 
        setInterval(() => {
            this.playAnimation(IMAGES);
        }, 1000 / 5);
    }

    playDeathAnimation() {
        let currentImageIndex = 0;
        let deathInterval = setInterval(() => {
            if (currentImageIndex < this.IMAGES_DEAD.length) {
                this.loadImage(this.IMAGES_DEAD[currentImageIndex]);
                currentImageIndex++;
            } else {
                clearInterval(deathInterval);
            }
        }, 200);
    }

    bossHit () {
        this.bossEnergy -= 25;
        if (this.bossEnergy <= 0) {
            this.bossEnergy = 0;
            this.bossIsDead = true;
            gameWin();
            this.playDeathAnimation();
            
        }
    }
}