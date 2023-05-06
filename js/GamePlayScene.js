import Enemy from "./Enemy.js";
import Turret from "./Turret.js";

export default class GamePlayScene extends Phaser.Scene{
    path;
    graphics;
    enemies;
    turrets;
    bullets;

    map =  [[ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0,-1,-1,-1,-1,-1,-1,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0]];

    constructor(){
        super("gamePlayScene");
    }

    preload() {
        // load the game assets – enemy and turret atlas
        this.load.atlas('sprites', 'assets/Sprites/knight.png', 'assets/Sprites/knight_atlas.json');    
    }
     
    create() {
        // this graphics element is only for visualization, 
        // its not related to our path
        this.graphics = this.add.graphics();    

        // the path for our enemies
        // parameters are the start x and y of our path
        this.path = this.add.path(96, -32);
        this.path.lineTo(96, 164);
        this.path.lineTo(480, 164);
        this.path.lineTo(480, 544);
        
        this.graphics.lineStyle(3, 0xffffff, 1);
    
        this.enemies = this.add.group({ classType: Enemy, runChildUpdate: true });
        this.turrets = this.add.group({ classType: Turret, runChildUpdate: true });
        // visualize the path
        this.path.draw(this.graphics);
    
        this.nextEnemy = 0;

        this.physics.add.overlap(this.enemies, this.bullets, this.damageEnemy);
    
        this.input.on('pointerdown', this.placeTurret);

        this.drawLines(this.graphics);
    }
     
    update(time, delta) {  
        // if its time for the next enemy
        if (time > this.nextEnemy)
        {        
            var enemy = this.enemies.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                
                // place the enemy at the start of the path
                enemy.startOnPath();
                
                this.nextEnemy = time + 2000;
            }       
        }
    }

    damageEnemy(enemy, bullet) {  
        // only if both enemy and bullet are alive
        if (enemy.active === true && bullet.active === true) {
            // we remove the bullet right away
            bullet.setActive(false);
            bullet.setVisible(false);    
            
            // decrease the enemy hp with BULLET_DAMAGE
            enemy.receiveDamage(BULLET_DAMAGE);
        }
    }

    placeTurret(pointer) {
        var i = Math.floor(pointer.y/64);
        var j = Math.floor(pointer.x/64);
        if(this.map[i][j] == 0) {
            var turret = this.turrets.get();
            if (turret)
            {
                turret.setActive(true);
                turret.setVisible(true);
                turret.place(i, j, this);
            }   
        }
    }

    drawLines(graphics) {
        graphics.lineStyle(1, 0x0000ff, 0.8);
        for(var i = 0; i < 8; i++) {
            graphics.moveTo(0, i * 64);
            graphics.lineTo(640, i * 64);
        }
        for(var j = 0; j < 10; j++) {
            graphics.moveTo(j * 64, 0);
            graphics.lineTo(j * 64, 512);
        }
        graphics.strokePath();
    }
}

