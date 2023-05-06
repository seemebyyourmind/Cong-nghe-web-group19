export default class Enemy extends Phaser.GameObjects.Image {
    constructor(scene){
        super(scene, 0, 0, 'sprites', 'idle_0');
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'idle_0');

        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
        this.speed = 1/10000;
        this.path = scene.path;
    }

    startOnPath(){
        this.follower.t = 0;
        this.hp = 100;
            
        this.path.getPoint(this.follower.t, this.follower.vec);
            
        this.setPosition(this.follower.vec.x, this.follower.vec.y);     
    }

    receiveDamage(){
        this.hp -= damage;           
            
        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            this.setActive(false);
            this.setVisible(false);      
        }
    }

    update(time, delta){
        this.follower.t += this.speed * delta;
        this.path.getPoint(this.follower.t, this.follower.vec);
        
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}