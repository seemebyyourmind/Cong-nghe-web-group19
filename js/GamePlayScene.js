import Enemy from "./Enemy.js";
import Turret from "./Turret.js";
import Bullet from "./Bullet.js";
import Map from "./Map.js";


const turrets = [];
export default class GamePlayScene extends Phaser.Scene{
    path;
    graphics;
    enemies;
    turrets = new Array();
    bullets;
    tileSize;

    constructor(){
        super("gamePlayScene");

    }

    preload() {
        // load the game assets – enemy and turret atlas
        this.load.image('bg1', 'assets/Background/BG1.png');
        this.load.atlas("thief", 'assets/Sprites/Thief/thief.png', 'assets/Sprites/Thief/thief_atlas.json');
        this.load.animation("thief_run", 'assets/Sprites/Thief/thief_anim.json');
    }
     
    create() {
        // this graphics element is only for visualization, 
        // its not related to our path

        this.add.image(512, 256, 'bg1');

        this.graphics = this.add.graphics();    

        // the path for our enemies
        // parameters are the start x and y of our path
        this.path = this.add.path(-10, 368);
        this.path.lineTo(208, 368);
        this.path.lineTo(208, 176);
        this.path.lineTo(528, 176);
        this.path.lineTo(528, 336);
        this.path.lineTo(1030, 336);
        
        this.graphics.lineStyle(3, 0xffffff, 1);
        this.tileSize = 32;

        // visualize the path
        this.path.draw(this.graphics);
    
        this.nextEnemy = 0;

        this.enemies = this.physics.add.group({classType: Enemy, runChildUpdate: true});

        this.turrets = new Array();

        this.bullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});

        //this.add.overlap(this.enemies, this.bullets, this.damageEnemy);
    
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
                enemy.startOnPath();

                this.nextEnemy = time + 1000;
            }   
        }

        for (var i = 0; i < turrets.length; i++){
            this.add.existing(turrets[i]);
            turrets[i].update(time, delta);
        }
    }

    damageEnemy(enemy, bullet) {  
        // only if both enemy and bullet are alive
        if (enemy.active === true && bullet.active === true) {
            // we remove the bullet right away
            bullet.setActive(false);
            bullet.setVisible(false);    
            
            // decrease the enemy hp with BULLET_DAMAGE
            enemy.receiveDamage(10);
        }
    }

    placeTurret(pointer) {

        var i = Math.floor(pointer.y/32);
        var j = Math.floor(pointer.x/32);


        if(Map.Level1Map[i][j] === 2) {
            var turret = new Turret(this.scene);
            if (turret)
            {
                turrets.push(turret);
                console.log(turrets.length);
                
                turret.setActive(true);
                turret.setVisible(true);
                turret.place(i, j);
                
            }  
        }
    }

    drawLines(graphics) {
        graphics.lineStyle(1, 0x0000ff, 0.8);
        for(var i = 0; i < 16; i++) {
            graphics.moveTo(0, i * this.tileSize);
            graphics.lineTo(32*this.tileSize, i * this.tileSize);
        }
        for(var j = 0; j < 32; j++) {
            graphics.moveTo(j * this.tileSize, 0);
            graphics.lineTo(j * this.tileSize, 512);
        }
        graphics.strokePath();
    }
}

