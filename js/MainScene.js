import Player from "./Player.js";
import Prepare from "./Prepare.js";

export default class MainScene extends Phaser.Scene{
    
    constructor(){
        super("mainScene");
    }

    // load asset before play
    preload(){
        Prepare.preload(this);
    }

    // create and setup before first loop
    create(){
        console.log("Create");
        this.player = new Player({scene:this, x: 0, y: 100, texture: 'knight_atlas', frame: 'idle_0'});
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.F,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
        })
    }

    // loop each frame
    update(){
        this.player.update();
    }
}