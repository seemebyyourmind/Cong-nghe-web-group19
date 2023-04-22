import Player from "./Player.js";
import Prepare from "./Prepare.js";

export default class MainScene extends Phaser.Scene{
    
    constructor(){
        super("mainScene");
    }

    // load asset before play
    preload(){
        this.load.image('bg1', 'assets/Background/bg1.png');
        Prepare.preload(this);
    }

    // create and setup before first loop
    create(){
        this.add.image(256, 128, 'bg1');
        this.player = new Player({scene:this, x: 0, y: 100, texture: 'knight', frame: 'idle_0'});
        this.staticPlayer = new Player({scene:this, x: 100, y: 100, texture: 'knight', frame: 'idle_1'});
        
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.F,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        this.matterCollision.addOnCollideStart({
            objectA: this.player,
            callback: eventData => {
              const { bodyB, gameObjectB } = eventData;
              console.log("Player touched something.");
              alert("Player touched something.");
              }
          });
    }

    // loop each frame
    update(){
        this.player.update();
    }

    collided(staticPlayer){
        staticPlayer.destroy();
    }
}