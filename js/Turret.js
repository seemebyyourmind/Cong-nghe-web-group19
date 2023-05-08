export default class Turret extends Phaser.GameObjects.Sprite {
    atkRange;
    atkDamage;
    constructor(scene){
        super(scene, 0, 0);
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
        this.nextTic = 0;
    }

    place(i, j, scene){
        this.y = i * scene.tileSize + scene.tileSize/2;
        this.x = j * scene.tileSize + scene.tileSize/2;
        scene.map[i][j] = 1;  
    }

    fireBullet(){
        var enemy = getEnemy(this.x, this.y, 200);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
    }

    getEnemy(x, y, distance) {
        var enemyUnits = enemies.getChildren();
        for(var i = 0; i < enemyUnits.length; i++) {       
            if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
                return enemyUnits[i];
        }
        return false;
    }

    update(time, delta){
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1000;
        }
    }
}