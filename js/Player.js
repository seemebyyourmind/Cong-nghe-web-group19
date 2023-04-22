export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data){
        let {scene, x, y, texture, frame} = data;
        super(scene.matter.world, x ,y, texture, frame);
        this.scene.add.existing(this);

        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x, this.y, 12, {isSensor: false, label: 'playerCollision'});
        var playerSensor = Bodies.circle(this.x, this.y, 24,{isSensor: true, label: 'playerSensor'});
        const compoundBody = Body.create({
            parts:[playerCollider, playerSensor],
            frictionAir: 0.35,
        })
        this.setExistingBody(compoundBody);
    }

    static create(scene){ 
        
        scene.this.inputKeys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.F,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
        })

        const sprite = scene.add.sprite(this.x, this.y).setInteractive();
        sprite.on('pointerdown', function (pointer)
        {

            this.setTint(0xff0000);

        });

        sprite.on('pointerout', function (pointer)
        {

            this.clearTint();

        });

        sprite.on('pointerup', function (pointer)
        {

            this.clearTint();

        });
    }

    update(){
        this.playerMove(2.5);
        
    }

    playerMove(speed){
        let playerVelocity = new Phaser.Math.Vector2();

        if (this.inputKeys.left.isDown) {
            this.flipX = true;
            playerVelocity.x = -1;
            
        }else if (this.inputKeys.right.isDown){
            this.flipX = false;
            playerVelocity.x = 1;
        }

        if (Math.abs(playerVelocity.x) > 0.1){
            this.anims.play('walk', true);
        }else{
            this.anims.play('idle', true);
        }

        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, 0);
    }
}

