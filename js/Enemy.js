export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene){
        super(scene, 0, 0, 'thief', 'mob_thief_002_1x11_0');

        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
        this.speed = 1/10000;
        this.path = scene.path;

        // const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        // var collider = Bodies.circle(this.x, this.y, 10, {isSensor: false, label: 'enemyCollider'});
        // var sensor = Bodies.circle(this.x, this.y, 20, {isSensor: true, label: 'enemySensor'});
        // const CompoundBody = Body.create({
        //     part: [collider, sensor],
        //     frictionAir : 0,
        // })
        // this.setExistingBody(CompoundBody);
    }
    
    startOnPath(){
        this.follower.t = 0;
        this.hp = 100;
            
        this.path.getPoint(this.follower.t, this.follower.vec);
            
        this.setPosition(this.follower.vec.x, this.follower.vec.y);     
    }

    receiveDamage(damage){
        this.hp -= damage;           
            
        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            this.setActive(false);
            this.setVisible(false);      
        }
    }

    update(time, delta){
        this.anims.play('thief_run', true);
        this.flipX = true;
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