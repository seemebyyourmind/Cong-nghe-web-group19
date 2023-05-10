import Map from "./Map.js"

var currentScene;
export default class Turret extends Phaser.GameObjects.Sprite {
    atkRange;
    atkDamage;
    constructor(scene){
        super(scene, 100, 100, 'thief', 'mob_thief_002_1x11_0');
        this.nextTic = 0;
        currentScene = scene;
        
    }

    place(i, j){
        
        this.y = i * 32 + 16;
        this.x = j * 32 + 16;
        Map.Level1Map[i][j] = 1;  
    }

    create(){
        
    }

    fireBullet(){
        var enemy = this.getEnemy(this.x, this.y, 200);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            // addBullet(this.x, this.y, angle);
            // this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
    }

    getEnemy(x, y, distance) {
        var enemyUnits = currentScene.enemies.getChildren();
        for(var i = 0; i < enemyUnits.length; i++) {       
            if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
                return enemyUnits[i];
        }
        return false;
    }

    update(time, delta){
        this.anims.play('thief_run', true);

        if(time > this.nextTic) {
            this.fireBullet();
            this.nextTic = time + 1000;
        }
    }
}