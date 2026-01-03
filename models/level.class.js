class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    salsa_bottles;
    level_end_x = 719 * 7;

    constructor(enemies, clouds, backgroundObjects, coins, salsa_bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.salsa_bottles = salsa_bottles;
    }
}